import { readdirSync } from 'fs';
import { loaderReducer } from '../reducers/loaderReducer.js';
import { removeExtensions } from './commonUtils.js';

/**
 * @name initialState
 */
export const initialState = async () => {
    const state = loaderReducer.initialState;
    try {
        const command = await import ('../../'.concat(state.modulePath).concat(readdirSync(state.modulePath).find(file => file.match(state.module) && file.endsWith('.js'))));
        state.data[command.default[state.module].data.name] = command.default[state.module];
    } catch (error) {
        console.error(error)
    }
    return state;
};

/**
 * @name init
 */
export const init = async () => {
    const state = loaderReducer.init;
    let index = 0;
    console.info('--- Initialising SlashCommands ---');
    for (const path of state.modulePath) {
        index !== 0 && console.info('--- Initialising events ---');
        state.modules.push(readdirSync(path).filter(file => file.endsWith('.js')));
        for (const module of state.modules[index]) {
            const command = await import ('../../'.concat(path).concat(module));

            if (index === 0){
                state.commands[command.default[removeExtensions(module).toLowerCase()].data.name] = command.default[removeExtensions(module).toLowerCase()];
                state.data.commands.push(state.commands[removeExtensions(module).toLowerCase()].data);
                console.info(`loaded interaction: ${removeExtensions(module).toLowerCase()}`);
            } else {
                if (!command.default[removeExtensions(module)].data.once) {
                    state.data.events.push(command.default[removeExtensions(module)]);
                    console.info(`loaded event: ${removeExtensions(module)}`);
                }
            }
        }
        index++;
    }
    return state;
};

/**
 * @name interactor
 * @param commandName
 */
export const interactor = async (commandName) => {
    const state = loaderReducer.interactor;
    try {
        const command = await import ('../../'.concat(state.path).concat(readdirSync(state.path).find(file => file.match(commandName) && file.endsWith('.js'))));
        state.commands[command.default[commandName].data.name] = command.default[commandName];
    } catch (error) {
        console.error(error);
    }
    return state;
};
