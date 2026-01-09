import { AttachmentBuilder, EmbedBuilder } from 'discord.js';

type AchievementEmbedOptions = {
  achievementName: string;
  tier: number;
  description?: string;
  badgePath: string;
};

export function buildAchievementUnlockEmbed(
  options: AchievementEmbedOptions
): {
  embed: EmbedBuilder;
  attachment: AttachmentBuilder;
} {
  const {
    achievementName,
    tier,
    description,
    badgePath,
  } = options;

  const attachment = new AttachmentBuilder(badgePath, {
    name: 'achievement.png',
  });

  const embed = new EmbedBuilder()
    .setColor(0xf1c40f)
    .setTitle('🏆 Achievement Unlocked!')
    .setDescription(
      `**${achievementName}**\n` +
        `Tier **${tier}** unlocked` +
        (description ? `\n\n${description}` : '')
    )
    .setImage('attachment://achievement.png')
    .setFooter({ text: 'Kian Canes Metaverse Manager' });

  return { embed, attachment };
}
