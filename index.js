const {
    Client,
    GatewayIntentBits,
    Collection,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    Events
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ]
});

client.commands = new Collection();

client.commands.set(
    "broadcast",
    require("./commands/broadcast")
);

client.once(Events.ClientReady, async () => {

    console.log(`✅ Logged in as ${client.user.tag}`);

    await client.application.commands.set([
        client.commands.get("broadcast").data
    ]);

    console.log("✅ Slash Commands Loaded");

});

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        return command.execute(interaction);

    }

    if (interaction.isModalSubmit()) {

        if (interaction.customId !== "broadcast_modal") return;

        const message =
            interaction.fields.getTextInputValue("message");

        await interaction.reply({
            content: "📤 بدأ إرسال البرودكاست...",
            ephemeral: true
        });

        const members = await interaction.guild.members.fetch();

        let sent = 0;
        let failed = 0;

        for (const [, member] of members) {

            if (member.user.bot) continue;

            try {

await member.send({
    content: `${message}\n\n${member.user}`,
});

                sent++;

            } catch {

                failed++;

            }

            await new Promise(r => setTimeout(r, 1000));

        }

        await interaction.editReply({
            content:
`✅ انتهى البرودكاست

📨 تم الإرسال: ${sent}
❌ فشل: ${failed}`
        });

    }

});

client.login(process.env.TOKEN);