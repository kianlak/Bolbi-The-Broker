// profile/data/buildProfileContextForTarget.ts
import type { Client } from 'discord.js';
import type { ProfileContext } from '../types/ProfileContext.ts';

export async function buildProfileContextForTarget(
  client: Client,
  targetUserId: string
): Promise<ProfileContext | null> {
  try {
    const targetedUser = await client.users.fetch(targetUserId);

    return {
      user: {
        id: targetedUser.id,
        username: targetedUser.username,
      },
      avatarUrl: targetedUser.displayAvatarURL(),
    };
  } catch {
    return null;
  }
}
