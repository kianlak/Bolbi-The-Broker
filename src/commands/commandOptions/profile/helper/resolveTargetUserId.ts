import { Message } from "discord.js";

export function resolveTargetUserId(
  message: Message,
  args: string[]
): string {
  // +profile
  if (!args.length) return message.author.id;

  // +profile <discordId>
  const candidate = args[0];

  if (!/^\d{17,20}$/.test(candidate)) {
    throw new Error('Invalid Discord user ID');
  }

  return candidate;
}
