const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Times out a member from the server',
    // devOnly: bool,
    // testOnly: bool,
    options: [
        {
            name: 'target-user',
            description: 'The user to timeout',
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: 'length',
            description: 'The length of timeout in seconds',
            required: true,
            type: ApplicationCommandOptionType.Number,
        },
        {
            name: 'reason',
            description: 'The reason of timeout',
            required: false,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    // botPermissions: [PermissionFlagsBits.KickMembers],

    callback: (client, interaction) => {
        interaction.reply(`${interaction.user.username} has timed out ${interaction.options._hoistedOptions.find(option => option.name === 'target-user').user.username} for ${interaction.options._hoistedOptions.find(option => option.name === 'length').value} seconds (i havent implemented this)`);
    },
}