import { MessageActionRow, MessageSelectMenu } from "discord.js";
import { SelectMenuValues } from "../../constants.js";
import { createCollector, secondsToMilliSeconds } from "../../utils/commonUtils.js";
import{
    callTimeoutEvent,
    callChangeVoyageSelectionEvent,
} from "./FishingComponentRender.js";

/**
 * @name selectBoxBuilder
 */
export const selectBoxBuilder = (customId) => {
    const voyageArea = (
        customId === '1st' ? '第一'
        : customId === '2nd' ? '第二'
        : customId === '3rd' ? '第三' : ''
    )
    return (
        {
            AreaSelectBox: new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId(customId)
                .setPlaceholder(voyageArea + '航海エリアが選択されていません')
                .addOptions([
                    {
                        label: 'ガラディオン湾[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroGaladionBay_noon,
                    },
                    {
                        label: 'ガラディオン湾[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroGaladionBay_evening,
                    },
                    {
                        label: 'ガラディオン湾[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroGaladionBay_night,
                    },
                ]).addOptions([
                    {
                        label: 'メルトール海峡南[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroTheSouthernStraitofMerlthor_noon,
                    },
                    {
                        label: 'メルトール海峡南[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroTheSouthernStraitofMerlthor_evening,
                    },
                    {
                        label: 'メルトール海峡南[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroTheSouthernStraitofMerlthor_night,
                    },
                ]).addOptions([
                    {
                        label: 'メルトール海峡北[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroTheNorthernStraitofMerlthor_noon,
                    },
                    {
                        label: 'メルトール海峡北[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroTheNorthernStraitofMerlthor_evening,
                    },
                    {
                        label: 'メルトール海峡北[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroTheNorthernStraitofMerlthor_night,
                    },
                ]).addOptions([
                    {
                        label: 'ロータノ海[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroRhotanoSea_noon,
                    },
                    {
                        label: 'ロータノ海[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroRhotanoSea_evening,
                    },
                    {
                        label: 'ロータノ海[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroRhotanoSea_night,
                    },
                ]).addOptions([
                    {
                        label: 'シェルダレー諸島[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroTheCieldalaes_noon,
                    },
                    {
                        label: 'シェルダレー諸島[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroTheCieldalaes_evening,
                    },
                    {
                        label: 'シェルダレー諸島[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroTheCieldalaes_night,
                    },
                ]).addOptions([
                    {
                        label: '緋汐海[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroBloodbrineSea_noon,
                    },
                    {
                        label: '緋汐海[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroBloodbrineSea_evening,
                    },
                    {
                        label: '緋汐海[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroBloodbrineSea_night,
                    },
                ]).addOptions([
                    {
                        label: 'ロズリト湾[昼]',
                        description: '時間帯：昼',
                        value: SelectMenuValues.SetMacroRothlytSound_noon,
                    },
                    {
                        label: 'ロズリト湾[夕]',
                        description: '時間帯：夕',
                        value: SelectMenuValues.SetMacroRothlytSound_evening,
                    },
                    {
                        label: 'ロズリト湾[夜]',
                        description: '時間帯：夜',
                        value: SelectMenuValues.SetMacroRothlytSound_night,
                    },
                ]),
            ),
        }
    );
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
        const firstSailing = state.embed.voyageSelection.firstSailing
        const secondSailing = state.embed.voyageSelection.secondSailing
        const thirdSailing = state.embed.voyageSelection.thirdSailing
        switch (selectBoxEvent.customId) {
            case '1st':
                state.embed.voyageSelection.firstSailing = selectBoxEvent.values[0];
                state.embed.initialEmbed.setDescription(`**下記巡航ボタンから航海エリアを選択してください。\n1) 第一巡航：${selectBoxEvent.values[0] !== '' ? selectBoxEvent.values[0] : '未選択'}\n2) 第二巡航：${secondSailing !== '' ? secondSailing : '未選択'}\n3) 第三巡航：${thirdSailing !== '' ? thirdSailing : '未選択'}**`);
                await callChangeVoyageSelectionEvent(interaction, selectBoxEvent, state);
                if (state.logger) console.error('callChangeVoyageSelectionEvent[start]');
                break;
            case '2nd':
                state.embed.voyageSelection.secondSailing = selectBoxEvent.values[0];
                state.embed.initialEmbed.setDescription(`**下記巡航ボタンから航海エリアを選択してください。\n1) 第一巡航：${firstSailing !== '' ? firstSailing : '未選択'}\n2) 第二巡航：${selectBoxEvent.values[0] !== '' ? selectBoxEvent.values[0] : '未選択'}\n3) 第三巡航：${thirdSailing !== '' ? thirdSailing : '未選択'}**`);
                await callChangeVoyageSelectionEvent(interaction, selectBoxEvent, state);
                if (state.logger) console.error('callChangeVoyageSelectionEvent[start]');
                break;
            case '3rd':
                state.embed.voyageSelection.thirdSailing = selectBoxEvent.values[0];
                state.embed.initialEmbed.setDescription(`**下記巡航ボタンから航海エリアを選択してください。\n1) 第一巡航：${firstSailing !== '' ? firstSailing : '未選択'}\n2) 第二巡航：${secondSailing !== '' ? secondSailing : '未選択'}\n3) 第三巡航：${selectBoxEvent.values[0] !== '' ? selectBoxEvent.values[0] : '未選択'}**`);
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