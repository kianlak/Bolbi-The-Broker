// profile/data/buildProfileContextFromUser.ts
import type { User } from 'discord.js';
import type { ProfileContext } from '../types/ProfileContext.ts';

export async function buildProfileContextFromUser(
  user: User
): Promise<ProfileContext> {
  return {
    user: {
      id: user.id,
      username: user.username,
    },
    avatarUrl: user.displayAvatarURL(),
  };
}
