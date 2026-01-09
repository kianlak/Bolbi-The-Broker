import {
  AttachmentBuilder,
  MessageFlags,
  StringSelectMenuInteraction,
} from 'discord.js';

import { logger } from '../../../../../shared/logger.ts';

import { buildRouletteWelcomeEmbed } from './ui/buildRouletteWelcomeEmbed.ts';
import { buildRouletteBetCategoryMenu } from './ui/buildRouletteBetCategoryMenu.ts';
import { getSession } from '../../session/sessionManager.ts';

export async function rouletteWelcomeHandler(interaction: StringSelectMenuInteraction): Promise<void> {
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  const session = getSession(interaction.user.id);

  if (!session) {
    await interaction.reply({
      content: '❌ **This session does not exist anymore**',
      flags: MessageFlags.Ephemeral,
    });

    logger.warn(`[${interaction.user.username}] Roulette session does not exist anymore`);

    return;
  }

  const embed = buildRouletteWelcomeEmbed(
    interaction.user.tag,
    interaction.user.displayAvatarURL()
  );

  await interaction.update({
    embeds: [embed],
    components: [buildRouletteBetCategoryMenu(interaction.user.id, interaction.user.username, session.sessionId, false)],
    files: [rouletteImage],
  });
}
