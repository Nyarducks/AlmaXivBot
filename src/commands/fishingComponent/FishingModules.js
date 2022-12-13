import { oceanFishingMacros } from "../../resources/common/oceanFishing/oceanFishingMacros.js";
import { oceanFishingRoutes, oceanFishingRoutePatterns } from "../../resources/common/oceanFishing/oceanFishingRoutes.js";
import { dateUtil, MONTH_OFFSET } from "../../utils/commonUtils.js";

/**
 * @name getOceanFishingMacros
 * @param state
 */
export const getOceanFishingMacros = (state) => {
    const _noon = '[昼]';
    const _evening = '[夕]';
    const _night = '[夜]';
    const firstSailing = state.oceanFishing.voyageSelection.firstSailing;
    const secondSailing = state.oceanFishing.voyageSelection.secondSailing;
    const thirdSailing = state.oceanFishing.voyageSelection.thirdSailing;

    let firstMacro = '';
    let secondMacro = '';
    let thirdMacro = '';

    for (const count of ['first', 'second', 'third']){
        const sailingOrder = (count === 'first' ? firstSailing : count === 'second' ? secondSailing : count === 'third' ? thirdSailing : '')
        switch (sailingOrder.slice( 0, -3 )) {
            case 'ガラディオン湾':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.night
                    if (count === 'second') secondMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.GaladionBay.normal + '\n' + oceanFishingMacros.GaladionBay.night
                    break;
                }
                break;
            case 'メルトール海峡南':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.night
                    if (count === 'second') secondMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheSouthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheSouthernStraitofMerlthor.night
                    break;
                }
                break;
            case 'メルトール海峡北':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    if (count === 'second') secondMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheNorthernStraitofMerlthor.normal + '\n' + oceanFishingMacros.TheNorthernStraitofMerlthor.night
                    break;
                }
                break;
            case 'ロータノ海':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.night
                    if (count === 'second') secondMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.RhotanoSea.normal + '\n' + oceanFishingMacros.RhotanoSea.night
                    break;
                }
                break;
            case 'シェルダレー諸島':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.night
                    if (count === 'second') secondMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.TheCieldalaes.normal + '\n' + oceanFishingMacros.TheCieldalaes.night
                    break;
                }
                break;
            case '緋汐海':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.night
                    if (count === 'second') secondMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.BloodbrineSea.normal + '\n' + oceanFishingMacros.BloodbrineSea.night
                    break;
                }
                break;
            case 'ロズリト湾':
                if (sailingOrder.slice(-3) === _noon) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.noon
                    if (count === 'second') secondMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.noon
                    if (count === 'third') thirdMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.noon
                    break;
                } else if (sailingOrder.slice(-3) === _evening) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.evening
                    if (count === 'second') secondMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.evening
                    if (count === 'third') thirdMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.evening
                    break;
                } else if (sailingOrder.slice(-3) === _night) {
                    if (count === 'first') firstMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.night
                    if (count === 'second') secondMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.night
                    if (count === 'third') thirdMacro = oceanFishingMacros.RothlytSound.normal + '\n' + oceanFishingMacros.RothlytSound.night
                    break;
                }
                break;
            default:
                return;
        }
    }

    const obj = {
        // オーシャンフィッシング行き先取得
        thirdSailing: state.oceanFishing.voyageSelection.thirdSailing,
        // 第一マクロ
        firstMacro: firstMacro,
        // 第二マクロ
        secondMacro: secondMacro,
        // 第三マクロ
        thirdMacro: thirdMacro,
    }
    return obj;
};

/**
 * @name getOceanFishingTimeZone
 */
export const getOceanFishingTimeZone = () => {
    // 当日のオーシャンフィッシング締め切り時間(LT23:15まで)
    const isUptime = Number(dateUtil().getHours.toString() + dateUtil().getMinutes.toString()) > 2315;
    return isUptime;
};

/**
 * @name getOceanFishingSchedule
 */
export const getOceanFishingSchedule = () => {
    const oceanFishingScheduleList = [];
    // 本日の奇数時間のみ取得して処理する
    // 現在時刻から24時間引いて処理する
    let hourUp = 0;
    for(let hoursIndex = dateUtil().getHours; hoursIndex < 24; hoursIndex++) {
        const _hours = dateUtil().getHours + hourUp++;

        // 条件・１：奇数時のみ
        // 条件・２：24時を超えていない(以降翌日のスケジュール)
        if(_hours % 2 !== 0  && _hours < 24) {
            // 条件：最新1件目の運航予定がLT15分を超えていないこと
            if (hourUp === 1 && dateUtil().getMinutes > 15) continue;
            // 日付計算
            const scheduleTime = (
                new Date(Number(dateUtil().getYear),
                Number(dateUtil().getMonth - MONTH_OFFSET),
                Number(dateUtil().getDate),
                Number(_hours),
            ));
            // 基準日を 2022/12/01に設定
            const baseDate = new Date(2022, 12 - MONTH_OFFSET, 1);
            let timeDiff = scheduleTime - baseDate;
            let days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

            let index = days % 12 + Math.floor(_hours / 2);
            if(index >= 12) index = index -12;
            const pattern = oceanFishingRoutePatterns[index];

            let routeInfo = [];
            for(let routesIndex = 0; routesIndex <= oceanFishingRoutes.route.length; routesIndex++) {
                if(oceanFishingRoutes.route[routesIndex].pattern == pattern) {
                    routeInfo = oceanFishingRoutes.route[routesIndex];
                    break;
                };
            };

            const obj = {
                localTime: _hours + ':00',
                destination: routeInfo.destination,
                firstRoute: {route: routeInfo.route1.area, timezone: routeInfo.route1.time_zone},
                secondRoute: {route: routeInfo.route2.area, timezone: routeInfo.route2.time_zone},
                thirdRoute: {route: routeInfo.route3.area, timezone: routeInfo.route3.time_zone},
            };

            // 運航表リストに追加
            oceanFishingScheduleList.push(obj);
        };
    };
    return oceanFishingScheduleList;
};
