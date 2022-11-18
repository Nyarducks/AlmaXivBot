import { codeBlock } from "@discordjs/builders";
import { UserInputEventComponent } from "./UserInput.js";

/**
 * @name callInitEvent
 * @param interaction
 * @param state
 */
export const callInitEvent = async (interaction, state) => {
    /**
     * [初期処理]
     * メッセージを受け取るイベント(メッセージイベント)を呼び出し
     */
    await interaction.deferReply().then(async() => { await callUserInputEvent(interaction, state) });
    if (state.logger) console.error('callInitEvent[start]');
};

/**
 * @name callUserInputEvent
 * @param interaction
 * @param state
 */
export const callUserInputEvent = async (interaction, state) => {
    /**
     * [初期処理]
     * メッセージのラベルにコードを入力してくださいの表示設定
     * メッセージを受け取るイベント(メッセージイベント)の処理を行う
     */
    await interaction.editReply({
        content: '**PLEASE PUT YOUR CODE**'
    }).then(async() => { await UserInputEventComponent(interaction, state) });
    if (state.logger) console.error('callUserInputEvent[start]');
};

/**
 * @name callSendCodeBlockEvent
 * @param interaction
 * @param state
 */
export const callSendCodeBlockEvent = async (interaction, state) => {
    /**
     * コードブロックを適応してメッセージを反映する
     */
    await interaction.editReply({
        content: codeBlock('js', state.message.content)
    });
    if (state.logger) console.info('callSendCodeBlockEvent[end]');
};

/**
 * @name callTimeoutEvent
 * @param interaction
 * @param eventCollector
 * @param state
 */
export const callTimeoutEvent = async (interaction, eventCollector, state) => {
    /**
     * イベントを受け取った後はイベントコレクターを停止する
     * メッセージを削除する
     */
    if (!eventCollector.ended) eventCollector.stop();
    await interaction.deleteReply();
    if (state.logger) console.info('callTimeoutEvent[end]');
};
