import { ButtonInteraction } from 'discord.js';

import { getOrCreateSession } from './rouletteSession.ts';
import { spinWheel } from './engine/spinWheel.ts';
import { resolveBets } from './engine/resolveBets.ts';
import { buildSpinResultEmbed } from './data/buildSpinResultEmbed.ts';
import { buildPostRoundActions } from './data/buildPostRoundActions.ts';

export async function handleSpin(
  interaction: ButtonInteraction
): Promise<void> {
  const [, , ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette round is not yours.',
      ephemeral: true,
    });
    return;
  }

  const session = getOrCreateSession(ownerId);

  if (session.bets.length === 0) {
    await interaction.reply({
      content: '❌ You have no bets placed.',
      ephemeral: true,
    });
    return;
  }

  const result = spinWheel();
  const resolved = resolveBets(session.bets, result);

  // End round
  session.bets.length = 0;

  await interaction.update({
    embeds: [buildSpinResultEmbed(result, resolved)],
    components: [buildPostRoundActions(ownerId)],
  });
}
