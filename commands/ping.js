const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun ping değerini gösterir"),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Ping hesaplanıyor...",
      fetchReply: true,
    });
    const timeDiff = sent.createdTimestamp - interaction.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("🏓 Pong!")
      .addFields(
        { name: "Bot Gecikmesi", value: `${timeDiff}ms`, inline: true },
        {
          name: "API Gecikmesi",
          value: `${Math.round(interaction.client.ws.ping)}ms`,
          inline: true,
        }
      )
      .setTimestamp();

    await interaction.editReply({ content: "", embeds: [embed] });
  },
};
