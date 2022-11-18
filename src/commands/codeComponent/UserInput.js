import { createCollector, secondsToMilliSeconds } from "../../utils/commonUtils.js";
import { callSendCodeBlockEvent, callTimeoutEvent } from "./codeComponentRender.js";

/**
 * @name UserInputEventComponent
 * @param interaction
 * @param state
 */
export const UserInputEventComponent = async (interaction, state) => {
    /**
     * メッセージイベントコレクターの作成、フィルターを使用して実行したユーザーのみを判定する
     */
    const inputMessageEventCollector = createCollector(interaction, state, 'inputMessageEvent');
    if (state.logger && !inputMessageEventCollector.ended) console.info('inputMessageEventCollector.started[tasks]');
    /**
     * タイムアウトの設定 (720秒)
     * 時間超過後タイムアウトイベントを呼び出す
     */
    const timeout = setTimeout(async () => { await callTimeoutEvent(interaction, inputMessageEventCollector, state) }, [secondsToMilliSeconds(720)]);
    if (state.logger) console.info(`setTimeout.started[tasks => ${secondsToMilliSeconds(720)}ms]`);
    /**
     * メッセージイベントコレクターを起動してメッセージを待機する
     */
    inputMessageEventCollector.on('collect', async inputMessageEvent => {
        /**
         * タイムアウトタイマーをクリアしてメッセージイベントコレクターの収集を終了する
         */
        if (timeout) clearTimeout(timeout);
        if (inputMessageEvent.content && !inputMessageEventCollector.ended) inputMessageEventCollector.stop();
    });
    /**
     * メッセージイベントコレクターから受け取ったメッセージを処理する
     */
    inputMessageEventCollector.on('end', async (inputMessageEventMap) => {
        /**
         * タイムアウトした時はメッセージオブジェクトが0件の為処理しない
         */
        if (inputMessageEventMap.size === 0) return;
        /**
         * stateの編集
         * → messageオブジェクトに取得したメッセージオブジェクトを設定
         */
        state.message = inputMessageEventMap.first();
         /**
          * 入力を受け取ったメッセージオブジェクトを削除する
          */
        state.message.delete();
        /**
         * メッセージ(コードブロック)送信イベントを呼び出す
         */
        await callSendCodeBlockEvent(interaction, state);
    });
    if (state.logger) console.info('callUserInputComponent[end]');
};
