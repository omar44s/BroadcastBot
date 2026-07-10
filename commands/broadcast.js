const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");

const OWNER_ID = "995964822711713842"; // حط ايديك هنا

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
            .setTitle("إرسال برودكاست");

        const message = new TextInputBuilder()
            .setCustomId("broadcast_message")
            .setLabel("اكتب رسالة البرودكاست")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(4000)
            .setPlaceholder(`مثال:

السلام عليكم

🚀 تم توفير كمية محدودة

السعر:
18.99

🟢 ضمان كامل
⚡ تسليم فوري

للشراء:
https://your-link.com`);

        const row = new ActionRowBuilder().addComponents(message);

        modal.addComponents(row);

        await interaction.showModal(modal);

    }
};