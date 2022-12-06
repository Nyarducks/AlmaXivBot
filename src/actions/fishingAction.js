/**
 * 初期処理
 */
export const INIT_FISHING = 'INIT_FISHING';

/**
 * 埋め込みメッセージ作成
 */
 export const EMBED_INIT_ID = 'EMBED_INIT_ID';

/**
 * 運航スケジュール利用不可状態 埋め込みメッセージ
 */
export const EMBED_NO_SCHEDULES_ID = 'EMBED_NO_SCHEDULES_ID';

/**
 * マクロ送信可能状態 埋め込みメッセージ
 */
export const EMBED_EXPORTABLE_MACRO_ID = 'EMBED_EXPORTABLE_MACRO_ID';

/**
 * マクロ削除可能状態 埋め込みメッセージ
 */
export const EMBED_DELETABLE_MACRO_ID = 'EMBED_DELETABLE_MACRO_ID';

/**
 * 航路取得ボタン
 */
export const BUTTON_GET_VOYAGE_ROUTE_ID = 'BUTTON_GET_VOYAGE_ROUTE';
export const BUTTON_GET_VOYAGE_ROUTE_LABEL = '航路取得';

/**
 * マクロ出力ボタン
 */
export const BUTTON_EXPORT_MACROS_ID = 'BUTTON_EXPORT_MACROS';
export const BUTTON_EXPORT_MACROS_LABEL = 'マクロ出力';

/**
 * マクロ削除ボタン
 */
 export const BUTTON_DELETE_MACROS_ID = 'BUTTON_DELETE_MACROS_ID';
 export const BUTTON_DELETE_MACROS_LABEL = 'マクロ削除';

 /**
 * 終了削除ボタン
 */
 export const BUTTON_FINISH_TASK_ID = 'BUTTON_FINISH_TASK_ID';
 export const BUTTON_FINISH_TASK_LABEL = '終了';

/**
 * @name fishingActionAction
 * @typedef fishingAction
 */
 export const fishingAction = {
    data: {
        name: "fishing",
        description: "get Ocean Fishing Macros",
    },
};