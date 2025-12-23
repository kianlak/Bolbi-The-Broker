import { Message } from "discord.js";
import type { ProfileContext } from "../types/ProfileContext.ts";

export function buildProfileContext(message: Message): ProfileContext {
  return {
    userId: message.author.id,
    username: message.author.username,
    avatarUrl: message.author.displayAvatarURL(),
  };
}