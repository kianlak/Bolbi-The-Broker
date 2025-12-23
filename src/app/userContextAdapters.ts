import type { Message, Interaction } from 'discord.js';

import type { UserContext } from '../types/UserContext.ts';

export function userContextFromMessage(message: Message): UserContext {
  return {
    id: message.author.id,
    username: message.author.username,
  };
}

export function userContextFromInteraction(
  interaction: Interaction
): UserContext | null {
  if (!interaction.isRepliable()) return null;

  return {
    id: interaction.user.id,
    username: interaction.user.username,
  };
}
