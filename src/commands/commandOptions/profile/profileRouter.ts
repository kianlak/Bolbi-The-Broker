import { UserService } from "../../../services/user/userService.ts";

import { renderMainProfileEmbed } from "./ui/renderMainProfile.ts";

import type { ProfileContext } from "./types/ProfileContext.ts";
import type { ProfilePage } from "./types/ProfilePage.ts";
import type { MainProfileStats } from "./types/MainProfileStats.ts";

const userService = new UserService();

export async function profileRenderRouter(
  page: ProfilePage,
  profileContext: ProfileContext
) {
  try {
    switch (page) {
      case 'main': {
        const userStats: MainProfileStats = userService.getUserByDiscordId(profileContext.user.id);

        if (!userStats) return null;

        return renderMainProfileEmbed(profileContext, userStats);
      }

      default:
        throw new Error(`Unknown profile page: (${page})`);
    }
  } catch(error) {
    throw error;
  }
}
