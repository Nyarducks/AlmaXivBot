import { MessageActionRow, MessageButton } from "discord.js";
import { BUTTON_DELETE_MACROS_ID, BUTTON_DELETE_MACROS_LABEL, BUTTON_EXPORT_MACROS_ID, BUTTON_EXPORT_MACROS_LABEL, BUTTON_FINISH_TASK_ID, BUTTON_FINISH_TASK_LABEL, BUTTON_GET_VOYAGE_ROUTE_ID, BUTTON_GET_VOYAGE_ROUTE_LABEL } from "../../actions/fishingAction.js";
import { buttonStyles, createCollector, secondsToMilliSeconds } from "../../utils/commonUtils.js";
import { callDeleteMacroEvent, callFinishTaskEvent, callGetVoyageSchedulesEvent, callSendMacroEvent, callTimeoutEvent } from "./FishingComponentRender.js";
import { getOceanFishingTimeZone } from "./FishingModules.js";

/**
 * @name ButtonBuilder
 */
 export const ButtonBuilder = (customId, state) => {
    /**
     * 初期画面ボタンインターフェース
     * ・航路取得(航海スケジュール利用不可フラグが有効の時のみ非活性)
     * ・マクロ出力(非活性)
     * ・終了
     */
    if (customId === BUTTON_GET_VOYAGE_ROUTE_ID) {
        // 航海スケジュール利用不可フラグ取得
        state.oceanFishing.scheduleUpTimeFlag = getOceanFishingTimeZone();
        return (
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId(BUTTON_GET_VOYAGE_ROUTE_ID).setLabel(BUTTON_GET_VOYAGE_ROUTE_LABEL).setStyle(buttonStyles.BLUE).setDisabled(state.oceanFishing.scheduleUpTimeFlag),
                new MessageButton().setCustomId(BUTTON_EXPORT_MACROS_ID).setLabel(BUTTON_EXPORT_MACROS_LABEL).setStyle(buttonStyles.GREEN).setDisabled(true),
                new MessageButton().setCustomId(BUTTON_FINISH_TASK_ID).setLabel(BUTTON_FINISH_TASK_LABEL).setStyle(buttonStyles.RED),
            )
        );
    };

    /**
     * マクロ出力ボタンインターフェース
     * ・航路取得(航海スケジュール利用不可フラグが有効の時のみ非活性)
     * ・マクロ出力(活性)
     * ・終了
     */
    if (customId === BUTTON_EXPORT_MACROS_ID) {
        // 航海スケジュール利用不可フラグ取得
        state.oceanFishing.scheduleUpTimeFlag = getOceanFishingTimeZone();
        return (
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId(BUTTON_GET_VOYAGE_ROUTE_ID).setLabel(BUTTON_GET_VOYAGE_ROUTE_LABEL).setStyle(buttonStyles.BLUE).setDisabled(state.oceanFishing.scheduleUpTimeFlag),
                new MessageButton().setCustomId(BUTTON_EXPORT_MACROS_ID).setLabel(BUTTON_EXPORT_MACROS_LABEL).setStyle(buttonStyles.GREEN).setDisabled(false),
                new MessageButton().setCustomId(BUTTON_FINISH_TASK_ID).setLabel(BUTTON_FINISH_TASK_LABEL).setStyle(buttonStyles.RED),
            )
        );
    };

    /**
     * マクロ削除ボタンインターフェース
     * ・航路取得(非活性)
     * ・マクロ出力(非活性)
     * ・マクロ削除(活性)
     * ・終了
     */
     if (customId === BUTTON_DELETE_MACROS_ID) {
        return (
            new MessageActionRow().addComponents(
                new MessageButton().setCustomId(BUTTON_GET_VOYAGE_ROUTE_ID).setLabel(BUTTON_GET_VOYAGE_ROUTE_LABEL).setStyle(buttonStyles.BLUE).setDisabled(true),
                new MessageButton().setCustomId(BUTTON_EXPORT_MACROS_ID).setLabel(BUTTON_EXPORT_MACROS_LABEL).setStyle(buttonStyles.GREEN).setDisabled(true),
                new MessageButton().setCustomId(BUTTON_DELETE_MACROS_ID).setLabel(BUTTON_DELETE_MACROS_LABEL).setStyle(buttonStyles.RED).setDisabled(false),
                new MessageButton().setCustomId(BUTTON_FINISH_TASK_ID).setLabel(BUTTON_FINISH_TASK_LABEL).setStyle(buttonStyles.RED),
            )
        );
    };
};

/**
 * @name ButtonEventComponent
 * @param interaction
 * @param state
 */
export const ButtonEventComponent = async (interaction, state) => {
    /**
     * ボタンイベントコレクターの作成、フィルターを使用してボタンIDと実行したユーザーのみを判定する(タイムアウト1分)
     */
    const buttonEventCollector = createCollector(interaction, state, 'buttonEvent');
    if (state.logger && buttonEventCollector) console.error('buttonEventCollector.stated[tasks]');
    /**
     * タイムアウトの設定 (240秒)
     * 時間超過後タイムアウトイベントを呼び出す
     */
    const timeout = setTimeout(async () => { await callTimeoutEvent(interaction, buttonEventCollector, state) }, secondsToMilliSeconds(240));
    if (state.logger) console.info(`setTimeout.started[tasks => ${secondsToMilliSeconds(240)}ms]`);
    /**
     * ボタンイベントコレクターを起動してボタンの選択値を待機する
     */
    buttonEventCollector.on('collect', async buttonEvent => {
        /**
         * タイムアウトタイマーをクリアしてボタンイベントコレクターの収集を終了する
         */
        if (timeout) clearTimeout(timeout);
        if (buttonEvent.customId !== '' && !buttonEventCollector.ended) buttonEventCollector.stop();
    });
    /**
     * ボタンイベントコレクターから受け取った選択値を処理する
     */
    buttonEventCollector.on('end', async buttonEventMap => {
        /**
         * タイムアウトした時はボタンオブジェクトが0件の為処理しない
         */
        if (buttonEventMap.size === 0) return;
        const buttonClickEvent = buttonEventMap.first();
        switch (buttonClickEvent.customId) {
            case BUTTON_GET_VOYAGE_ROUTE_ID:
                /**
                 * 航路取得ボタンを押した時、航路取得画面(航路一覧/セレクトボックス)を呼び出す
                 */
                await callGetVoyageSchedulesEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callGetVoyageSchedulesEvent[start]');
                break;
            case BUTTON_EXPORT_MACROS_ID:
                /**
                 * マクロ出力ボタンを押した時、マクロを送信する
                 */
                await callSendMacroEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callSendMacroEvent[start]');
                break;
            case BUTTON_DELETE_MACROS_ID:
                /**
                 * マクロ削除ボタンを押した時、マクロを削除する
                 */
                await callDeleteMacroEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callDeleteMacroEvent[start]');
                break;
            case BUTTON_FINISH_TASK_ID:
                /**
                 * 終了ボタンを押した時、コマンドを終了する
                 */
                await callFinishTaskEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callFinishTaskEvent[start]');
                break;
            default:
                console.error('failed to get buttonType!');
                break;
        }
    });
    if (state.logger) console.info('ButtonEventComponent[end]');
};
