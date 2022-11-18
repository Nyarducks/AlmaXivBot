import { readyAction } from '../actions/readyAction.js';
import { BotStatus, getEnv } from '../constants.js';
import { init } from '../utils/moduleLoader.js';

/**
 * @name ready
 * @typedef eventOnce
 */
export const ready = {

    /**
     * @type properties
     */
    data: readyAction.data,

    /**
     * @name execute
     * @param {Client} bot
     */
    async execute(bot) {
        console.info(`login as ${bot.user.username}`);
        const props = await init();
        await bot.application.commands.set(props.data.commands, getEnv.Guild_ID);
        for (const event of props.data.events) { await bot.on(event.data.name, (...args) => event.execute(...args)) }
        await bot.user.setActivity(BotStatus.Development);
        console.info('--- bot is ready ---');
    },
};
export default { ready };
