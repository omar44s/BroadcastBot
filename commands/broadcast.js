const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");

const OWNER_ID = "995964822711713842"; // حط ايديك

module.exports = {

    data: new SlashCommandBuilder()
        .setName("broadcast")
        .setDescription("إرسال برودكاست")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ ليس لديك صلاحية.",
                ephemeral: true
            });
        }

        const modal = new ModalBuilder()
            .setCustomId("broadcast_modal")
            .setTitle("Broadcast");

        const input = new TextInputBuilder()
            .setCustomId("message")
            .setLabel("اكتب رسالة البرودكاست")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setPlaceholder("اكتب رسالتك هنا...");

        const row = new ActionRowBuilder().addComponents(input);

        modal.addComponents(row);

        await interaction.showModal(modal);

    }

};