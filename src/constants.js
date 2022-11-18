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
