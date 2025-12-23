import type { Interaction } from 'discord.js';

import { VALID_CHANNEL_IDS } from '../config/channels.ts';

import { userBootstrap } from './userBootstrap.ts';
import { interactionRouter } from '../interactions/interactionsRouter.ts';

export async function handleInteractionCommandEntry(interaction: Interaction) {
  if (
    !interaction.isChatInputCommand() &&
    !interaction.isButton() &&
    !interaction.isStringSelectMenu()
  ) {
    return;
  }

  if (interaction.channelId && !VALID_CHANNEL_IDS.has(interaction.channelId)) return;

  userBootstrap(interaction.user.id);

  await interactionRouter(interaction);
}
