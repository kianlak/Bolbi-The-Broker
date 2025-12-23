import { AttachmentBuilder, EmbedBuilder, StringSelectMenuInteraction } from "discord.js";
import { buildBetCategoryMenu } from "../data/buildBetCategoryMenu.ts";

export async function rouletteWelcomeEmbed(interaction: StringSelectMenuInteraction) {
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png')

  const embed = new EmbedBuilder()
    .setTitle('🎡 Roulette')
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(
      [
        'Welcome to Roulette.',
        '',
        'Choose what type of bet(s) you want to put in',
      ].join('\n')
    )
    .setImage('attachment://rouletteTable.png')
    .setColor(0xc0392b);

  await interaction.update({
    embeds: [embed],
    components: [
      buildBetCategoryMenu(interaction.user.id),
    ],
    files: [rouletteImage],
  });

  return embed;
}
