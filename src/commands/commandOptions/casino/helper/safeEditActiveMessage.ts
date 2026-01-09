import type { Interaction } from 'discord.js';

import { getSession } from '../session/sessionManager.ts';

export async function safeEditActiveMessage(
  interaction: Interaction,
  payload: {
    embeds?: any[];
    components?: any[];
    files?: any[];
  }
) {
  const session = getSession(interaction.user.id);
  if (!session?.activeMessageId) return;

  const channel = interaction.channel;
  if (!channel || !channel.isTextBased()) return;

  try {
    const message = await channel.messages.fetch(
      session.activeMessageId
    );

    await message.edit(payload);
  } catch {
  }
}
