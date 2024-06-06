const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

require('dotenv').config();

module.exports = async (client) => {
    const localCommands = getLocalCommands();
    
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, process.env.GUILD_ID);

        for (const { name, description, options } of localCommands) {
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name)

            if (existingCommand) {
                if (localCommands.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}"`)
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommands)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command "${name}"`);
                }
            } else {
                if (localCommands.deleted)
                    continue;

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered command "${name}"`)
            }
        }
    } catch (err) {
        console.log(`There was an error: ${err}`)
    }
};