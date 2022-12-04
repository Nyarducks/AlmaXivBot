import { EmbedBuilder  } from "discord.js";
import { oceanFishingMacros } from "../../resources/common/oceanFishing/oceanFishingMacros.js";

/**
 * @name emptyEmbedBuilder
 */
export const emptyEmbedBuilder = () => {
    return new EmbedBuilder()
    .setTitle('**オーシャンフィッシングマクロ自動生成 v1.0**')
    .setDescription('**下記巡航ボタンから航海エリアを選択してください。\n1) 第一巡航：未選択\n2) 第二巡航：未選択\n3) 第三巡航：未選択**');
};

/**
 * @name getOceanFishingMacros
 * @param state
 */
export const getOceanFishingMacros = (state) => {
    const _noon = '[昼]';
    const _evening = '[夕]';
    const _night = '[夜]';
    const firstSailing = state.embed.voyageSelection.firstSailing;
    const secondSailing = state.embed.voyageSelection.secondSailing;
    const thirdSailing = state.embed.voyageSelection.thirdSailing;

    let firstMacro = '';
    let secondMacro = '';
    let thirdMacro = '';

    for (const count of ['first', 'second', 'third']){
        const sailingOrder = (count === 'first' ? firstSailing : count === 'second' ? secondSailing : count === 'third' ? thirdSailing : '')
        switch (sailingOrder.slice( 0, -3 )) {
            case 'ガラディオン湾': 
                if (count === 'first') firstMacro = oceanFishingMacros.GaladionBay.normal
                if (count === 'second') secondMacro = oceanFishingMacros.GaladionBay.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.GaladionBay.normal

                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.GaladionBay.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.GaladionBay.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.GaladionBay.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.GaladionBay.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.GaladionBay.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.GaladionBay.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.GaladionBay.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.GaladionBay.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.GaladionBay.night
                    break;
                }
                break;
            case 'メルトール海峡南': 
                if (count === 'first') firstMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal
                if (count === 'second') secondMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.heSouthernStraitofMerlthor.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.heSouthernStraitofMerlthor.night
                    break;
                }
                break;
            case 'メルトール海峡北': 
                if (count === 'first') firstMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal
                if (count === 'second') secondMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    break;
                }
                break;
            case 'ロータノ海': 
                if (count === 'first') firstMacro = oceanFishingMacros.RhotanoSea.normal
                if (count === 'second') secondMacro = oceanFishingMacros.RhotanoSea.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.RhotanoSea.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RhotanoSea.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RhotanoSea.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RhotanoSea.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RhotanoSea.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RhotanoSea.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RhotanoSea.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RhotanoSea.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RhotanoSea.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RhotanoSea.night
                    break;
                }
                break;
            case 'シェルダレー諸島': 
                if (count === 'first') firstMacro = oceanFishingMacros.TheCieldalaes.normal
                if (count === 'second') secondMacro = oceanFishingMacros.TheCieldalaes.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.TheCieldalaes.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.TheCieldalaes.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.TheCieldalaes.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.TheCieldalaes.night
                    break;
                }
                break;
            case '緋汐海': 
                if (count === 'first') firstMacro = oceanFishingMacros.BloodbrineSea.normal
                if (count === 'second') secondMacro = oceanFishingMacros.BloodbrineSea.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.BloodbrineSea.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.BloodbrineSea.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.BloodbrineSea.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.BloodbrineSea.night
                    break;
                }
                break;
            case 'ロズリト湾': 
                if (count === 'first') firstMacro = oceanFishingMacros.RothlytSound.normal
                if (count === 'second') secondMacro = oceanFishingMacros.RothlytSound.normal
                if (count === 'second') thirdMacro = oceanFishingMacros.RothlytSound.normal
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RothlytSound.noon
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RothlytSound.noon
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RothlytSound.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RothlytSound.evening
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RothlytSound.evening
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RothlytSound.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = firstMacro + '\n' + oceanFishingMacros.RothlytSound.night
                    if (count === 'second') secondMacro = secondMacro + '\n' + oceanFishingMacros.RothlytSound.night
                    if (count === 'third') thirdMacro = thirdMacro + '\n' + oceanFishingMacros.RothlytSound.night
                    break;
                }
                break;
            default:
                return;
        }
    }

    const obj = {
        // オーシャンフィッシング行き先取得
        thirdSailing: state.embed.voyageSelection.thirdSailing,
        // 第一マクロ
        firstMacro: firstMacro,
        // 第二マクロ
        secondMacro: secondMacro,
        // 第三マクロ
        thirdMacro: thirdMacro,
    }
    return obj;
}
