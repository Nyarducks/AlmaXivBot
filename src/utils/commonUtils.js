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
            return buttonEvent => buttonEvent.customId && buttonEvent.user.id === state.userInfo.userId;
        case 'selectBoxEvent':
            return selectBoxEvent => selectBoxEvent.customId && selectBoxEvent.user.id === state.userInfo.userId;
        case 'inputMessageEvent':
            return inputMessageEvent => inputMessageEvent.author.id === state.userInfo.userId;
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
