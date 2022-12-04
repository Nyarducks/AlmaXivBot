import { Client, GatewayIntentBits  } from 'discord.js';
import { getEnv, Permission } from "./constants.js";
import { initialState } from './utils/moduleLoader.js';

/**
 * @name app
 */
const app = async () => {
    const props = await initialState();
    const bot = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
        partials: [Permission.Message, Permission.Channel, Permission.Reaction],
    });
    bot.once(props.module, (...args) => props.data[props.module].execute(...args));
    await bot.login(getEnv.Token);
};
await app();
