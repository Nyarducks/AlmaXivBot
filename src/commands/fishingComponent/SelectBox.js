import { MessageActionRow, MessageSelectMenu } from "discord.js";
import { BUTTON_GET_VOYAGE_ROUTE_ID } from "../../actions/fishingAction.js";
import { createCollector, secondsToMilliSeconds } from "../../utils/commonUtils.js";
import{
    callTimeoutEvent,
    callChangeVoyageSelectionEvent,
} from "./FishingComponentRender.js";
import { getOceanFishingSchedule } from "./FishingModules.js";

/**
 * @name selectBoxBuilder
 */
export const selectBoxBuilder = (customId) => {
    /**
     * 航海エリア一覧
     */
    if (customId === BUTTON_GET_VOYAGE_ROUTE_ID) {
        // 航海エリア一覧取得
        const oceanFishingSchedules = getOceanFishingSchedule();
        return (
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId(customId)
                .setPlaceholder('航海エリアを選択してください')
                .addOptions(
                    oceanFishingSchedules.map((item, i) => {
                        return {
                            label: `LT${item.localTime} ${item.destination}行き [${item.firstRoute?.timezone} → ${item.secondRoute?.timezone} → ${item.thirdRoute?.timezone}]`,
                            description: `${item.firstRoute.route} → ${item.secondRoute.route} → ${item.thirdRoute.route}`,
                            value: `${i},${item.destination},${`${item.firstRoute.route}[${item.firstRoute.timezone}]`},${`${item.secondRoute.route}[${item.secondRoute.timezone}]`},${`${item.thirdRoute.route}[${item.thirdRoute.timezone}]`}`
                        };
                    }),
                ),
            )
        );
    };
};

/**
 * @name SelectBoxComponent
 * @param interaction
 * @param state
 */
export const SelectBoxComponent = async (interaction, state) => {
    /**
     * セレクトメニューイベントコレクターの作成、ボタンイベントコレクターの作成、フィルターを使用して埋め込みメッセージの編集モード選択状態と実行したユーザーのみを判定する
     **/
    const selectBoxEventCollector = createCollector(interaction, state, 'selectBoxEvent');
    if (state.logger && !selectBoxEventCollector.ended) console.info('selectBoxEventCollector.started[tasks]');
    /**
     * タイムアウトの設定 (240秒)
     * 時間超過後タイムアウトイベントを呼び出す
     */
    const timeout = setTimeout(async () => { await callTimeoutEvent(interaction, selectBoxEventCollector, state) }, [secondsToMilliSeconds(240)]);
    if (state.logger) console.info(`setTimeout.started[tasks => ${secondsToMilliSeconds(240)}ms]`);
    /**
     * セレクトボックスイベントコレクターを起動してセレクトボックスの選択を待機する
     */
    selectBoxEventCollector.on('collect', async selectBoxEvent => {
        /**
         * タイムアウトタイマーをクリアしてセレクトボックスイベントコレクターの収集を終了する
         */
        if (timeout) clearTimeout(timeout);
        if (selectBoxEvent.values.length > 0 && !selectBoxEventCollector.ended) selectBoxEventCollector.stop();
    });
    /**
     * セレクトボックスイベントコレクターから受け取った選択値を処理する
     */
    selectBoxEventCollector.on('end', async (selectBoxEventMap) => {
        /**
         * タイムアウトした時はセレクトボックスオブジェクトが0件の為処理しない
         */
        if (selectBoxEventMap.size === 0) return;
        const selectBoxEvent = selectBoxEventMap.reduce();
        /**
         * セレクトボックスで選択された値から、stateの埋め込みメッセージオブジェクトの編集モードを設定する
         */
        switch (selectBoxEvent.customId) {
            /**
             * 航路取得した時、航海エリア選択状態更新処理を呼び出す
             */
            case BUTTON_GET_VOYAGE_ROUTE_ID:
                // returns comma-separated string => unique_Id, destination, firstRoute[timezone], secondRoute[timezone], thirdRoute[timezone]
                state.oceanFishing.voyageSelection.destination = selectBoxEvent.values[0].split(',')[1];
                state.oceanFishing.voyageSelection.firstSailing = selectBoxEvent.values[0].split(',')[2];
                state.oceanFishing.voyageSelection.secondSailing = selectBoxEvent.values[0].split(',')[3];
                state.oceanFishing.voyageSelection.thirdSailing = selectBoxEvent.values[0].split(',')[4];
                await callChangeVoyageSelectionEvent(interaction, selectBoxEvent, state);
                if (state.logger) console.error('callChangeVoyageSelectionEvent[start]');
                break;
            default:
                console.error('unable to return values!');
                break;
        }
    });
    if (state.logger) console.info('callSelectBoxComponent[end]');
};
