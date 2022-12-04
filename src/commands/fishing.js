import { fishingAction } from "../actions/fishingAction.js";
import { fishingReducer } from "../reducers/fishingReducer.js";
import { callInitEvent } from "./fishingComponent/FishingComponentRender.js";

/**
 * @name fishing
 * @typedef command
 */
export const fishing = {

    /**
     * @type properties
     */
    data: fishingAction.data,

    /**
     * @name execute
     * @param interaction
     */
    async execute(interaction) {
        /**
         * stateの定義
         * → embedオブジェクトには初期化された埋め込みメッセージを設定
         * → userInfoオブジェクトには初期化されたユーザIDを設定
         * → buttonActionオブジェクトには初期化されたボタンを設定
         * → selectBoxActionオブジェクトには初期化されたセレクトボックスを設定
         * → loggerはデバッグ用に作成した、冗長的なログを表示するフラグを設定
         */
        let state = fishingReducer.initialState;
        /**
         * stateの編集
         * → userInfoオブジェクトにコマンドを実行したユーザー情報を設定
         */
        state.userInfo = {
            userId: interaction.member.user.id
        };
        /**
         * [初期処理]
         * 埋め込みメッセージプレビュー画面の送信処理
         * ボタン選択状態の処理(ボタンイベント)呼び出し
         */
        await callInitEvent(interaction, state);
    },
};
export default { fishing };