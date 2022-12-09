
import { INIT_FISHING } from "../actions/fishingAction.js";

/**
 * @name fishingReducer
 * @typedef properties
 */
export const fishingReducer = (type) => {
    /**
     * 初期データ
     */
    if (type === INIT_FISHING){
        return (Object.assign({}, {
            // 編集者ID
            editorUserId: '',
            // 埋め込みメッセージオブジェクト
            embed: undefined,
            // ボタンオブジェクト
            buttonAction: undefined,
            // セレクトボックスオブジェクト
            selectBoxAction: undefined,
            // オーシャンフィッシングデータ
            oceanFishing: {
                // 航海スケジュール利用不可フラグ
                scheduleUpTimeFlag: true,
                // マクロメッセージオブジェクト
                macroObject: undefined,
                // 航海スケジュール選択状態
                voyageSelection: {
                    // 行き先
                    destination: '',
                    // 第一海域
                    firstSailing: '',
                    // 第二海域
                    secondSailing: '',
                    // 第三海域
                    thirdSailing: ''
                },
            },
            // 開発用ロガーフラグ
            logger: false,
        }));
    };
};
