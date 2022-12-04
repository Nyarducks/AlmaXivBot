
import { emptyEmbedBuilder } from "../commands/fishingComponent/FishingModules.js";
import { ButtonComponent } from "../commands/fishingComponent/Button.js";

/**
 * @name fishingReducer
 * @typedef properties
 */
export const fishingReducer = {
    initialState: {
        embed: {initialEmbed: emptyEmbedBuilder(), voyageSelection: {firstSailing: '', secondSailing: '', thirdSailing: ''}},
        userInfo: {userId: ''},
        buttonAction: ButtonComponent(),
        selectBoxAction: undefined,
        logger: false,
    },
};