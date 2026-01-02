import { Message } from 'discord.js';

export async function enforceChannel(
  message: Message,
  allowedChannelId?: string
): Promise<boolean> {
  if (!allowedChannelId) return true;

  if (message.channel.id !== allowedChannelId) {
    await message.reply(`🚫 This command can only be used in <#${allowedChannelId}>`);

    return false;
  }

  return true;
}
