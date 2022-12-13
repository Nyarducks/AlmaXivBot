/**
 * @name useMultiText
 * @param {string} context
 */
export const useMultiText = context => context.toString().match(/\/\*\n*([^]*)\*\//)[1].replace(/\n*$/, "")

/**
 * @name removeExtensions
 * @param {string} fileName
 */

export const removeExtensions = (fileName) => { return fileName.split('.')[0] };

/**
 * @name secondsToMilliSeconds
 * @param {number} seconds
 */
export const secondsToMilliSeconds = seconds => { return 1000 * seconds };

/**
 * @name filter
 * @param state
 * @param type
 */
export const customFilter = (state, type) => {
    switch (type){
        case 'buttonEvent':
            return buttonEvent => buttonEvent.customId && buttonEvent.user.id === state.editorUserId;
        case 'selectBoxEvent':
            return selectBoxEvent => selectBoxEvent.customId && selectBoxEvent.user.id === state.editorUserId;
        case 'inputMessageEvent':
            return inputMessageEvent => inputMessageEvent.author.id === state.editorUserId;
        default:
            return console.error('unable to return values');
    }
};

/**
 * @name createCollector
 * @param interaction
 * @param state
 * @param type
 */
export const createCollector = (interaction, state, type) => {
    switch (type) {
        case 'buttonEvent':
        case 'selectBoxEvent':
            return interaction.channel.createMessageComponentCollector(customFilter(state, type));
        case 'inputMessageEvent':
            return interaction.channel.createMessageCollector({filter: customFilter(state, type)});
        default:
            return console.error('createCollector has errors');
    }
};

/**
 * @name buttonStyles
 */
export const buttonStyles = {
    BLUE: 1,
    GRAY: 2,
    GREEN: 3,
    RED: 4,
}

/**
 * @name dateUtil
 */
// Dateクラスを使って指定した月 - MONTH_OFFSETを指定することで 1月-12月まで指定できます。
// 例：new Date(2022, 1 - MONTH_OFFSET, 1);
// 返り値：Sat Jan 01 2022 00:00:00 GMT+0900 (Japan Standard Time)
// 注意： 日付型をstringで指定した場合はオフセットは必要ありません。
// 例：new Date('2022-01-01T00:00:00');
// 返り値：Sat Jan 01 2022 00:00:00 GMT+0900 (Japan Standard Time)
export const MONTH_OFFSET = 1;
export const dateUtil = () => {
    return {
        getYear: new Date().getFullYear(),
        getMonth: new Date().getMonth() + 1,
        getDate: new Date().getDate(),
        getHours: new Date().getHours(),
        getMinutes: new Date().getMinutes(),
        getSeconds: new Date().getSeconds(),
        getCustomFormat: {
            mm: (`0${new Date().getMinutes()}`).slice(-2).toString(),
            yyyymmdd: `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}`.toString(),
        },
    }
};
