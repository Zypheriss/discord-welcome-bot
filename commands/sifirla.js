const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sifirla")
    .setDescription("Giriş-çıkış ayarlarını sıfırla")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const client = interaction.client;
    client.db.run(
      "DELETE FROM guild_settings WHERE guild_id = ?",
      [guildId],
      function (err) {
        if (err) {
          console.error("Veritabanı hatası:", err);
          return interaction.reply({
            content: " Ayarlar sıfırlanırken bir hata oluştu!",
            ephemeral: true,
          });
        }

        const embed = new EmbedBuilder()
          .setColor("#3d0000ff")
          .setTitle("🗑️ Ayarlar Sıfırlandı")
          .setDescription(
            "Giriş-çıkış ayarları başarıyla sıfırlandı. Artık hiçbir kanala mesaj gönderilmeyecek."
          )
          .setTimestamp();

        interaction.reply({ embeds: [embed] });
      }
    );
  },
};
