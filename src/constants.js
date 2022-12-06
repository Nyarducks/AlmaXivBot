import dotenv from 'dotenv';

/**
 * @name Permission
 */
export const Permission = {
    Message: 'Message'.toUpperCase(),
    Channel: 'Channel'.toUpperCase(),
    Reaction: 'Reaction'.toUpperCase(),
};

/**
 * @name SelectMenuValues
 */
 const _noon = '[昼]'
 const _evening = '[夕]'
 const _night = '[夜]'
 export const oceanFishingArea = {
    GaladionBay: 'ガラディオン湾',
    TheSouthernStraitofMerlthor: 'メルトール海峡南',
    TheNorthernStraitofMerlthor: 'メルトール海峡北',
    RhotanoSea: 'ロータノ海',
    TheCieldalaes: 'シェルダレー諸島',
    BloodbrineSea: '緋汐海',
    RothlytSound: 'ロズリト湾',
 }

 export const SelectMenuValues = {
    // ガラディオン湾
    SetMacroGaladionBay_noon: oceanFishingArea.GaladionBay + _noon,
    SetMacroGaladionBay_evening: oceanFishingArea.GaladionBay + _evening,
    SetMacroGaladionBay_night: oceanFishingArea.GaladionBay + _night,
    // メルトール海峡南
    SetMacroTheSouthernStraitofMerlthor_noon: oceanFishingArea.TheSouthernStraitofMerlthor + _noon,
    SetMacroTheSouthernStraitofMerlthor_evening: oceanFishingArea.TheSouthernStraitofMerlthor + _evening,
    SetMacroTheSouthernStraitofMerlthor_night: oceanFishingArea.TheSouthernStraitofMerlthor + _night,
    // メルトール海峡北
    SetMacroTheNorthernStraitofMerlthor_noon: oceanFishingArea.TheNorthernStraitofMerlthor + _noon,
    SetMacroTheNorthernStraitofMerlthor_evening: oceanFishingArea.TheNorthernStraitofMerlthor + _evening,
    SetMacroTheNorthernStraitofMerlthor_night: oceanFishingArea.TheNorthernStraitofMerlthor + _night,
    // ロータノ海
    SetMacroRhotanoSea_noon: oceanFishingArea.RhotanoSea + _noon,
    SetMacroRhotanoSea_evening: oceanFishingArea.RhotanoSea + _evening,
    SetMacroRhotanoSea_night: oceanFishingArea.RhotanoSea + _night,
    // シェルダレー諸島
    SetMacroTheCieldalaes_noon: oceanFishingArea.TheCieldalaes + _noon,
    SetMacroTheCieldalaes_evening: oceanFishingArea.TheCieldalaes + _evening,
    SetMacroTheCieldalaes_night: oceanFishingArea.TheCieldalaes + _night,
    // 緋汐海
    SetMacroBloodbrineSea_noon: oceanFishingArea.BloodbrineSea + _noon,
    SetMacroBloodbrineSea_evening: oceanFishingArea.BloodbrineSea + _evening,
    SetMacroBloodbrineSea_night: oceanFishingArea.BloodbrineSea + _night,
    // ロズリト湾
    SetMacroRothlytSound_noon: oceanFishingArea.RothlytSound + _noon,
    SetMacroRothlytSound_evening: oceanFishingArea.RothlytSound + _evening,
    SetMacroRothlytSound_night: oceanFishingArea.RothlytSound + _night,
};

/**
 * @name getEnv
 */
dotenv.config();
export const getEnv = {
    Token: process.env.TOKEN,
    Guild_ID: process.env.GUILD_ID,
    Bot_ID: Buffer.from(process.env.TOKEN.replace(/\..+/, ''), 'base64').toString(),
    Version: process.env.VERSION !== 'INSERT_VERSION_HERE' ? process.env.VERSION : '9.9.9',
};

/**
 * @name BotStatus
 */
export const BotStatus = {
    Development: `Testing ver ${process.env.npm_package_version ? process.env.npm_package_version : getEnv.Version}`,
    Staging: `Staging ver ${process.env.npm_package_version ? process.env.npm_package_version : getEnv.Version}`,
    Product: `Production ver ${process.env.npm_package_version ? process.env.npm_package_version : getEnv.Version}`,
};

/**
 * @name EndPoint
 */
export const EndPoint = `https://discord.com/api/v9/applications/${getEnv.Bot_ID}/commands`;
