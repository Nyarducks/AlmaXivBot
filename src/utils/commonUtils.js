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
 const filter = (state, type) => {
    switch (type){
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
        case 'inputMessageEvent':
            return interaction.channel.createMessageCollector({filter: filter(state, type)});
        default:
            return console.error('createCollector has errors');
    }
};
