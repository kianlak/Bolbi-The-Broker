import type { Interaction } from 'discord.js';

import { getOrCreateSession } from './rouletteSession.ts';
import { buildBetCategoryMenu } from './data/buildBetCategoryMenu.ts';
import { buildDashboardActions } from './data/buildDashboardAction.ts';
import { buildSpinButton } from './data/buildSpinButton.ts';
import { buildRouletteDashboard } from './data/buildRouletteDashboard.ts';
import { editRouletteMessage } from './editRouletteMessage.ts';

export async function showRouletteDashboard(
  interaction: Interaction
): Promise<void> {
  const userId = interaction.user.id;
  const session = getOrCreateSession(userId);

  const components = [
    buildBetCategoryMenu(userId),
    buildDashboardActions(userId),
  ];

  if (session.bets.length > 0) {
    components.push(buildSpinButton(userId));
  }

  await editRouletteMessage(interaction, {
    embeds: [buildRouletteDashboard(session)],
    components,
  });
}
