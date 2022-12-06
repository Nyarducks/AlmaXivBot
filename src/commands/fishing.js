import { fishingAction, INIT_FISHING } from "../actions/fishingAction.js";
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
         */
        let state = fishingReducer(INIT_FISHING);

        // コマンド実行者のメンバーIDを設定
        state.editorUserId = interaction.member.user.id;

        /**
         * [初期処理]
         */
        await callInitEvent(interaction, state);
    },
};
export default { fishing };
