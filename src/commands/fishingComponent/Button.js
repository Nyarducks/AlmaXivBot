import { MessageActionRow, MessageButton } from "discord.js";
import { createCollector, secondsToMilliSeconds } from "../../utils/commonUtils.js";
import { callSelectBoxEvent, callSendMacroEvent, callTimeoutEvent } from "./FishingComponentRender.js";

/**
 * @name ButtonBuilder
 */
export const ButtonBuilder = () => {
    return (
        {
            initialButton: new MessageActionRow().addComponents(
                new MessageButton().setCustomId('1st').setLabel('第一巡航').setStyle('PRIMARY'),
                new MessageButton().setCustomId('2nd').setLabel('第二巡航').setStyle('DANGER'),
                new MessageButton().setCustomId('3rd').setLabel('第三巡航').setStyle('PRIMARY'),
                new MessageButton().setCustomId('export').setLabel('マクロ出力').setStyle('SUCCESS').setDisabled(true),
            ),
            exportableButton: new MessageActionRow().addComponents(
                new MessageButton().setCustomId('1st').setLabel('第一巡航').setStyle('PRIMARY'),
                new MessageButton().setCustomId('2nd').setLabel('第二巡航').setStyle('DANGER'),
                new MessageButton().setCustomId('3rd').setLabel('第三巡航').setStyle('PRIMARY'),
                new MessageButton().setCustomId('export').setLabel('マクロ出力').setStyle('SUCCESS').setDisabled(false),
            ),
        }
    );
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
            case '1st':
            case '2nd':
            case '3rd':
                /**
                 * 巡航ボタンを押した時、エリア画面(セレクトボックスイベント)を呼び出す
                 */
                
                await callSelectBoxEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callSelectBoxEvent[start]');
                break;
            case 'export':
                /**
                 * 出力ボタンを押した時、マクロを送信する
                 */
                await callSendMacroEvent(interaction, buttonClickEvent, state);
                if (state.logger) console.error('callSendMacroEvent[start]');
                break;
            default:
                console.error('failed to get buttonType!');
                break;
        }
    });
    if (state.logger) console.info('ButtonEventComponent[end]');
};