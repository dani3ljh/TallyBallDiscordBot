const { ContextMenuCommandAssertions } = require('discord.js');
const { devs } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
require('dotenv').config();

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand())
        return;

    const localCommands = getLocalCommands();
    
    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if (!commandObject)
            return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command',
                    ephemeral: true,
                });
                return;
            }
        }
        if (commandObject.testOnly) {
            if (interaction.guild.id !== process.env.GUILD_ID) {
                interaction.reply({
                    content: 'This command cannot be ran here',
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            const bot = interaction.guild.members.me;

            for (const permission of commandObject.botPermissions) {
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'I don\'t have enough permissions',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (err) {
        console.log(`There was an error running this command: ${err.stack}`)
    }
};