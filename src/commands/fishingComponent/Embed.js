import { EmbedBuilder } from "discord.js";
import { EMBED_DELETABLE_MACRO_ID, EMBED_EXPORTABLE_MACRO_ID, EMBED_INIT_ID, EMBED_NO_SCHEDULES_ID } from "../../actions/fishingAction.js";
import { dateUtil } from "../../utils/commonUtils.js";

/**
 * @name embedMessageBuilder
 */
 export const embedMessageBuilder = (customId, state) => {
    /**
     * 航海エリア一覧
     */
    if (customId === EMBED_INIT_ID) {
        // 航海エリア一覧取得
        return (
            new EmbedBuilder()
            .setTitle('**オーシャンフィッシング運航表**')
            .setDescription(
                `**航路取得ボタンからスケジュールを選択してください。
                \n1) 航路選択状態：未選択**`
            )
        );
    };

    /**
     * 航海エリア利用不可
     */
    if (customId === EMBED_NO_SCHEDULES_ID) {
        return (
            state.embed.setDescription(
                `**本日のスケジュールはありません。(現在時刻：${`${dateUtil.Hours}:${dateUtil.CustomFormat.mm}`})
                \n★) 次回航路選択可能時間：${`${dateUtil.Year}/${dateUtil.Month}/${dateUtil.Date} 00:00 ～`}
                **`
            )
        );
    };

    /**
     * マクロ送信可能
     */
    if (customId === EMBED_EXPORTABLE_MACRO_ID) {
        return (
            state.embed.setDescription(
                `**航路を取得しました。マクロ出力可能です。
                \n★ 航路：${state.oceanFishing.voyageSelection.destination}行き
                \n1) 第一巡航：${state.oceanFishing.voyageSelection.firstSailing}
                \n2) 第二巡航：${state.oceanFishing.voyageSelection.secondSailing}
                \n3) 第三巡航：${state.oceanFishing.voyageSelection.thirdSailing}
                **`
            )
        );
    };

    /**
     * マクロ削除可能
     */
     if (customId === EMBED_DELETABLE_MACRO_ID) {
        return (
            state.embed.setDescription(
                `**設定された航路のマクロを出力しました。マクロ削除可能です。
                \n★ 航路：${state.oceanFishing.voyageSelection.destination}行き
                \n1) 第一巡航：${state.oceanFishing.voyageSelection.firstSailing}
                \n2) 第二巡航：${state.oceanFishing.voyageSelection.secondSailing}
                \n3) 第三巡航：${state.oceanFishing.voyageSelection.thirdSailing}
                **`
            )
        );
    };
};
