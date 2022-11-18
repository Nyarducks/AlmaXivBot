import { codeAction } from '../actions/codeAction.js';
import { codeReducer } from '../reducers/codeReducer.js';
import { callInitEvent } from './codeComponent/codeComponentRender.js';

/**
 * @name code
 * @typedef command
 */
 const code = {

    /**
     * @type properties
     */
    data: codeAction.data,

    /**
     * @name execute
     * @param interaction
     */
    async execute(interaction) {
        /**
         * stateの定義
         * → userInfoオブジェクトには初期化されたユーザ名、ユーザIDを設定
         * → loggerはデバッグ用に作成した、冗長的なログを表示するフラグを設定
         */
        let state = codeReducer.initialState;
        /**
         * stateの編集
         * → userInfoオブジェクトにコマンドを実行したユーザー情報を設定
         */
        state.userInfo = {
             userName: interaction.member.user.username,
             userId: interaction.member.user.id
        };
        /**
         * [初期処理]
         * メッセージを受け取るイベント呼び出し
         */
        await callInitEvent(interaction, state);
    },
};
export default { code };
