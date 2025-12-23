import type { Interaction } from 'discord.js';

import { VALID_CHANNEL_IDS } from '../config/channels.ts';

import { userBootstrap } from './userBootstrap.ts';
import { interactionRouter } from '../interactions/interactionsRouter.ts';
import { userContextFromInteraction } from './userContextAdapters.ts';

export async function handleInteractionCommandEntry(interaction: Interaction) {
  if (interaction.channelId && !VALID_CHANNEL_IDS.has(interaction.channelId)) return;

  const user = userContextFromInteraction(interaction);
  if (!user) return;
  
  if (interaction.isChatInputCommand()) userBootstrap(user);

  await interactionRouter(interaction);
}
