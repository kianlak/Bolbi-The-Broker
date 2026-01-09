import { AttachmentBuilder, ButtonInteraction } from 'discord.js';

import { logger } from '../../../../../../shared/logger.ts';

import { buildRouletteWelcomeEmbed } from '../ui/buildRouletteWelcomeEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../ui/buildRouletteBetCategoryMenu.ts';
import {
  createSession,
  deleteSession,
  setActiveMessageId,
} from '../../../session/sessionManager.ts';

export async function handleRouletteNewRound(
  interaction: ButtonInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId] = interaction.customId.split(':');
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');

  if (interaction.user.id !== ownerId) {
    await interaction.editReply({
      content: '❌ Not your button.',
    });
    return;
  }

  logger.info(`[${interaction.user.username}] User requested to create New Round for "roulette"\n`);
  
  deleteSession(ownerId);

  const session = createSession(ownerId);
  session.game = 'roulette';

  const message = await interaction.followUp({
    embeds: [buildRouletteWelcomeEmbed(
      interaction.user.tag,
      interaction.user.displayAvatarURL())
    ],
    components: [
      buildRouletteBetCategoryMenu(
        ownerId,
        interaction.user.username,
        session.sessionId
      ),
    ],
    files: [rouletteImage],
  });
  
  setActiveMessageId(ownerId, message.id);

}
