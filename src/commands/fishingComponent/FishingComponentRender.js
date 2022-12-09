import { BUTTON_DELETE_MACROS_ID, BUTTON_EXPORT_MACROS_ID, BUTTON_GET_VOYAGE_ROUTE_ID, EMBED_DELETABLE_MACRO_ID, EMBED_EXPORTABLE_MACRO_ID, EMBED_INIT_ID, EMBED_NO_SCHEDULES_ID } from "../../actions/fishingAction.js";
import { FishingButtonBuilder, ButtonEventComponent } from "./Button.js";
import { embedMessageBuilder } from "./Embed.js";
import { getOceanFishingMacros } from "./FishingModules.js";
import { selectBoxBuilder, SelectBoxComponent } from "./SelectBox.js";

/**
 * @name callInitEvent
 * @param interaction
 * @param state
 */
export const callInitEvent = async (interaction, state) => {
    /**
     * [初期処理]
     * 埋め込みメッセージ作成
     */

    // 埋め込みメッセージを作成する
    state.embed = embedMessageBuilder(EMBED_INIT_ID, state);

    /**
     * コンテキストの作成
     */
    await interaction.deferReply().then(async() => await callButtonEvent(interaction, state));
    if (state.logger) console.error('callInitEvent[start]');
};

/**
 * @name callButtonEvent
 * @param interaction
 * @param state
 */
export const callButtonEvent = async (interaction, state) => {
    /**
     * ボタン初期処理
     */

    // ボタンインターフェースを作成する
    state.buttonAction = FishingButtonBuilder(BUTTON_GET_VOYAGE_ROUTE_ID, state);

    // 航海スケジュールフラグが有効時のみ、航海スケジュール利用不可状態に更新する(埋め込みメッセージ)
    if (state.oceanFishing.scheduleUpTimeFlag) state.embed = embedMessageBuilder(EMBED_NO_SCHEDULES_ID, state);

    /**
     * コンテキストの更新処理
     * ・埋め込みメッセージ更新
     * ・ボタンオブジェクト更新
     */
    await interaction.editReply({
        content: '**[Preview Mode]**',
        embeds: [state.embed],
        components: [state.buttonAction],
    }).then(async() => await ButtonEventComponent(interaction, state));
    if (state.logger) console.error('callButtonComponent[start]');
};

/**
 * @name callGetVoyageSchedulesEvent
 * @param interaction
 * @param buttonClickEvent
 * @param state
 */
export const callGetVoyageSchedulesEvent = async (interaction, buttonClickEvent, state) => {
    /**
     * 航海エリアを選択する
     */
    state.selectBoxAction = selectBoxBuilder(buttonClickEvent.customId);

    /**
     * コンテキストの更新処理
     * ・セレクトボックスオブジェクト更新
     */
    await buttonClickEvent.update({
        components: [state.selectBoxAction]
    }).then(async() => { await SelectBoxComponent(interaction, state) });
    if (state.logger) console.error('callSelectBoxComponent[start]');
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
     * 埋め込みメッセージを削除する
     */
    if (!eventCollector.ended) eventCollector.stop();
    await interaction.deleteReply();
    if (state.logger) console.info('callTimeoutEvent[end]');
};

/**
 * @name callChangeVoyageSelectionEvent
 * @param interaction
 * @param state
 */
 export const callChangeVoyageSelectionEvent = async (interaction, selectBoxEvent, state) => {
    /**
     * 航海エリア選択状態を更新する
     */

    // マクロ出力フラグ
    const exportButtonVisibilityFlag = (state.oceanFishing.voyageSelection.firstSailing !== '' && state.oceanFishing.voyageSelection.secondSailing !== '' && state.oceanFishing.voyageSelection.thirdSailing !== '');
    if (exportButtonVisibilityFlag) {
        // 埋め込みメッセージをマクロ出力可能状態に更新する
        state.embed = embedMessageBuilder(EMBED_EXPORTABLE_MACRO_ID, state);
        // 航路選択状態の場合はマクロボタンを活性にする
        state.buttonAction = FishingButtonBuilder(BUTTON_EXPORT_MACROS_ID, state);
    } else {
        // 航路未選択状態の場合はマクロボタンを非活性にする
        state.buttonAction = FishingButtonBuilder(BUTTON_GET_VOYAGE_ROUTE_ID, state);
    };

    // 航海スケジュールフラグが有効時のみ、航海スケジュール利用不可状態に更新する(埋め込みメッセージ)
    if (state.oceanFishing.scheduleUpTimeFlag) state.embed = embedMessageBuilder(EMBED_NO_SCHEDULES_ID, state);

    /**
     * コンテキストの更新処理
     * ・埋め込みメッセージ更新
     * ・ボタンオブジェクト更新
     */
    await selectBoxEvent.update({
        embeds: [state.embed],
        components: [state.buttonAction],
    }).then(async() => { await ButtonEventComponent(interaction, state) });
    if (state.logger) console.error('callChangeVoyageSelectionEvent[start]');
};

/**
 * @name callSendMacroEvent
 * @param interaction
 * @param state
 */
export const callSendMacroEvent = async (interaction, buttonClickEvent, state) => {
    /**
     * 選択した航路のマクロを送信する
     */
    // マクロ取得
    const obj = getOceanFishingMacros(state);

    // マクロテンプレート
    const macroContext = {
        macroTitle: `**${obj?.thirdSailing}行き マクロ**`,
        // 第一マクロ
        firstMacroName: `macroname: オーシャンフィッシング１`,
        firstMacroHeader: "```/cwl3 オーシャンフィッシング 第一巡航",
        firstMacroBody: obj?.firstMacro,
        firstMacroFooter: "```",
        // 第二マクロ
        secondMacroName: `macroname: オーシャンフィッシング２`,
        secondMacroHeader: "```/cwl3 オーシャンフィッシング 第二巡航",
        secondMacroBody: obj?.secondMacro,
        secondMacroFooter: "```",
        // 第三マクロ
        thirdMacroName: `macroname: オーシャンフィッシング３`,
        thirdMacroHeader: "```/cwl3 オーシャンフィッシング 第三巡航",
        thirdMacroBody: obj?.thirdMacro,
        thirdMacroFooter: "```",
    };
    // マクロ出力ボタンを非活性かつマクロ削除ボタンを活性にする
    state.buttonAction = FishingButtonBuilder(BUTTON_DELETE_MACROS_ID, state);

    // 埋め込みメッセージをマクロ削除可能状態に更新する
    state.embed = embedMessageBuilder(EMBED_DELETABLE_MACRO_ID, state);

    /**
     * コンテキストの更新処理
     * ・埋め込みメッセージ更新
     * ・ボタンオブジェクト更新
     * ・マクロ送信
     */

    await buttonClickEvent.update({
        embeds: [state.embed],
        components: [state.buttonAction],
    }).then(async() => {
        state.oceanFishing.macroObject = await interaction.channel.send(
            macroContext.macroTitle + '\n'
            + macroContext.firstMacroName + '\n' + macroContext.firstMacroHeader + '\n' + macroContext.firstMacroBody + macroContext.firstMacroFooter
            + macroContext.secondMacroName + '\n' + macroContext.secondMacroHeader + '\n' + macroContext.secondMacroBody + macroContext.secondMacroFooter
            + macroContext.thirdMacroName + '\n' + macroContext.thirdMacroHeader + '\n' + macroContext.thirdMacroBody + macroContext.thirdMacroFooter
        );
        await ButtonEventComponent(interaction, state);
    });
    if (state.logger) console.error('callSendMacroEvent[start]');
};

/**
 * @name callDeleteMacroEvent
 * @param interaction
 * @param state
 */
 export const callDeleteMacroEvent = async (interaction, buttonClickEvent, state) => {
    /**
     * 送信したマクロを削除する
     */

    // マクロ出力ボタンを非活性かつマクロ削除ボタンを活性にする
    state.buttonAction = FishingButtonBuilder(BUTTON_EXPORT_MACROS_ID, state);

    // 埋め込みメッセージをマクロ出力可能状態に更新する
    state.embed = embedMessageBuilder(EMBED_EXPORTABLE_MACRO_ID, state);

    /**
     * コンテキストの更新処理
     * ・埋め込みメッセージ更新
     * ・ボタンオブジェクト更新
     * ・マクロ削除
     */
    await buttonClickEvent.update({
        embeds: [state.embed],
        components: [state.buttonAction],
    }).then(async() => { await state.oceanFishing.macroObject.delete(); state.oceanFishing.macroObject = undefined; await ButtonEventComponent(interaction, state)});
    if (state.logger) console.error('callDeleteMacroEvent[start]');
};

/**
 * @name callFinishTaskEvent
 * @param interaction
 * @param state
 */
 export const callFinishTaskEvent = async (interaction, buttonClickEvent, state) => {
    /**
     * コマンド終了ボタン
     * 埋め込みメッセージと出力したマクロを削除する
     */

    /**
     * コンテキストの削除処理
     * ・埋め込みメッセージの削除
     * ・マクロの削除
     */
    await buttonClickEvent.update({
        embeds: [],
        components: [],
    }).then(async() => {
        if (state.oceanFishing.macroObject !== undefined) await state.oceanFishing.macroObject.delete();
        await interaction.deleteReply();
    });
    if (state.logger) console.error('callFinishTaskEvent[start]');
};
