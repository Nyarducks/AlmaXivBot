import { ButtonEventComponent } from "./Button.js";
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
     * 埋め込みメッセージのプレビュー画面送信処理
     * ボタン選択状態の処理(ボタンイベント)を呼び出し
     */
    await interaction.deferReply().then(async() => {
        await callButtonEvent(interaction, state);
    });
    if (state.logger) console.error('callInitEvent[start]');
};

/**
 * @name callButtonEvent
 * @param interaction
 * @param state
 */
export const callButtonEvent = async (interaction, state) => {
    /**
     * 埋め込みメッセージのラベルにプレビューモードの表示設定
     * 送信・編集ボタンを追加してボタン選択状態の処理(ボタンイベント)を行う
     */
    await interaction.editReply({
        content: '**[Preview Mode]**',
        embeds: [state.embed.initialEmbed],
        components: [state.buttonAction.initialButton],
    }).then(async() => { await ButtonEventComponent(interaction, state) });
    if (state.logger) console.error('callButtonComponent[start]');
};

/**
 * @name callSelectBoxEvent
 * @param interaction
 * @param buttonClickEvent
 * @param state
 */
export const callSelectBoxEvent = async (interaction, buttonClickEvent, state) => {
    /**
     * 埋め込みメッセージにセレクトメニューを追加して編集画面(セレクトメニューイベント)の処理を行う
     */
    state.selectBoxAction = selectBoxBuilder(buttonClickEvent.customId)
    await buttonClickEvent.update({
        components: [state.selectBoxAction.AreaSelectBox]
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
     * イベントを受け取った後はイベントコレクターを停止する
     * 埋め込みメッセージの航海エリア選択状態を更新する
     */
    const exportButtonVisibilityFlag = (
        state.embed.voyageSelection.firstSailing !== ''
        && state.embed.voyageSelection.secondSailing !== ''
        && state.embed.voyageSelection.thirdSailing !== ''
    );
    await selectBoxEvent.update({
        embeds: [state.embed.initialEmbed],
        components: [exportButtonVisibilityFlag && true ? state.buttonAction.exportableButton : state.buttonAction.initialButton],
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
     * イベントを受け取った後はイベントコレクターを停止する
     * 埋め込みメッセージの航海エリア選択状態を更新する
     */
    const obj = getOceanFishingMacros(state)

    const macroContext = {
        macroTitle: `***${obj?.thirdSailing}行き マクロ***`,
        // 第一マクロ
        firstMacroName: `> macroname: オーシャンフィッシング１`,
        firstMacroHeader: "``` /cwl3 オーシャンフィッシング 第一巡航",
        firstMacroBody: obj?.firstMacro,
        firstMacroFooter: "```",
        // 第二マクロ
        secondMacroName: `> macroname: オーシャンフィッシング２`,
        secondMacroHeader: "``` /cwl3 オーシャンフィッシング 第二巡航",
        secondMacroBody: obj?.secondMacro,
        secondMacroFooter: "```",
        // 第三マクロ
        thirdMacroName: `> macroname: オーシャンフィッシング３`,
        thirdMacroHeader: "``` /cwl3 オーシャンフィッシング 第三巡航",
        thirdMacroBody: obj?.thirdMacro,
        thirdMacroFooter: "```",
    }
    await buttonClickEvent.update({
        content: '\u200B',
        components: [],
    }).then(async() => { await buttonClickEvent.deleteReply();await interaction.channel.send(
        macroContext.macroTitle + '\n'
        + macroContext.firstMacroName + '\n' + macroContext.firstMacroHeader + '\n' + macroContext.firstMacroBody + macroContext.firstMacroFooter
        + macroContext.secondMacroName + '\n' + macroContext.secondMacroHeader + '\n' + macroContext.secondMacroBody + macroContext.secondMacroFooter
        + macroContext.thirdMacroName + '\n' + macroContext.thirdMacroHeader + '\n' + macroContext.thirdMacroBody + macroContext.thirdMacroFooter
    )});
    if (state.logger) console.error('callSendMacroEvent[start]');
}
