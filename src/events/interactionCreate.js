import { interactionCreateAction } from '../actions/interactionCreateAction.js';
import { interactor } from '../utils/moduleLoader.js';

/**
 * @name interactionCreate
 * @typedef event
 */
const interactionCreate = {

    /**
     * @type properties
     */
    data: interactionCreateAction.data,

    /**
     * @name execute
     * @param interaction
     */
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        const props = await interactor(interaction.commandName);
        const command = props.commands[interaction.commandName];
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error executing command!',
                ephemeral: true,
            });
        }
    },
};
export default { interactionCreate };
