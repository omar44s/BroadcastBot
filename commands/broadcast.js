const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const OWNER_ID = "995964822711713842"; // حط ايدي حسابك هنا

module.exports = {
    data: new SlashCommandBuilder()
        .setName("broadcast")
        .setDescription("إرسال برودكاست في الخاص لجميع أعضاء السيرفر")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("اكتب الرسالة")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ ليس لديك صلاحية لاستخدام هذا الأمر.",
                ephemeral: true
            });
        }

        const message = interaction.options.getString("message");

        await interaction.reply({
            content: "📤 جاري إرسال البرودكاست...",
            ephemeral: true
        });

        const members = await interaction.guild.members.fetch();

        let sent = 0;
        let failed = 0;

        for (const [, member] of members) {

            if (member.user.bot) continue;

            try {

                await member.send({
                    content: `<@${member.id}>\n\n${message}`,
                    allowedMentions: {
                        users: [member.id]
                    }
                });

                sent++;

            } catch (err) {

                failed++;

            }

            await new Promise(resolve => setTimeout(resolve, 1200));
        }

        await interaction.editReply({
            content:
`✅ انتهى البرودكاست

📨 تم الإرسال: ${sent}
❌ فشل: ${failed}`
        });

    }
};