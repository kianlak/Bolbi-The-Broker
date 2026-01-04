import type { TextBasedChannel } from 'discord.js';

export async function safeDeleteMessage(
  channel: TextBasedChannel | null,
  messageId?: string
): Promise<void> {
  if (!channel || !messageId) return;

  try {
    const message = await channel.messages.fetch(messageId);
    await message.delete();
  } catch {
    // Ignore:
    // - Unknown Message
    // - Missing Permissions
    // - Already deleted
  }
}
