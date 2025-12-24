import { Message } from "discord.js";

export function getMessageChannelName(message: Message): string {
  let channelLabel = `channel:${message.channelId}`;

  if (message.guild && message.channel.isTextBased()) {
    const channel = message.channel;
    if ('name' in channel) {
      channelLabel = `#${channel.name}`;
    }
  }

  return channelLabel;
}