/**
 * @name loaderReducer
 * @typedef property
 */
export const loaderReducer = {
    initialState: {
        data: {},
        module: 'ready',
        modulePath: './src/events/',
    },
    init: {
        commands: {},
        data: { commands: [], events: [] },
        modules: [],
        modulePath: ['./src/commands/', './src/events/'],
    },
    interactor: {
        commands: {},
        path: './src/commands/',
    },
};
