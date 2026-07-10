const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const OWNER_ID = "995964822711713842";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("broadcast")
        .setDescription("إرسال برودكاست في الخاص لجميع أعضاء السيرفر")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("الرسالة")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ ليس لديك صلاحية.",
                ephemeral: true
            });
        }

        const message = interaction.options.getString("message");

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

for (const [, member] of members) {

    if (member.user.bot) continue;

    try {

        await member.send({
            content: `<@${member.user.id}>\n\n${message}`
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
};