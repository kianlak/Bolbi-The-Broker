import { handleProfileMenu } from './handleProfileMenu.ts';

import type { Interaction } from 'discord.js';

export async function profileInteractionRouter(interaction: Interaction) {
  if (!interaction.isStringSelectMenu()) return;

  const [, action] = interaction.customId.split(':');

  if (action === 'menu') {
    return handleProfileMenu(interaction);
  }
}
