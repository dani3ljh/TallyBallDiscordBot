module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devOnly: bool,
    // testOnly: bool,
    // options: object[],

    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping} ms`);
    },
}