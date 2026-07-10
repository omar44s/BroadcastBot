const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        console.log(`✅ Logged in as ${client.user.tag}`);

        try {
            await client.application.commands.set([
                require("../commands/broadcast").data.toJSON()
            ]);

            console.log("✅ Slash commands loaded.");
        } catch (err) {
            console.error(err);
        }
    }
};