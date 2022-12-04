
import { emptyEmbedBuilder } from "../commands/fishingComponent/FishingModules.js";
import { ButtonBuilder } from "../commands/fishingComponent/Button.js";

/**
 * @name fishingReducer
 * @typedef properties
 */
export const fishingReducer = {
    initialState: {
        embed: {initialEmbed: emptyEmbedBuilder(), voyageSelection: {firstSailing: '', secondSailing: '', thirdSailing: ''}},
        userInfo: {userId: ''},
        buttonAction: ButtonBuilder(),
        selectBoxAction: undefined,
        logger: false,
    },
};