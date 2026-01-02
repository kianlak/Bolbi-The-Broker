import { logger } from "../../../shared/logger.ts";

import { UserService } from "../../../services/user/userService.ts";
import { renderMainProfileEmbed } from "./ui/buildMainProfile.ts";

import type { ProfileContext } from "./types/ProfileContext.ts";
import type { ProfilePage } from "./types/ProfilePage.ts";
import type { MainProfileStats } from "./types/MainProfileStats.ts";
import type { UserContext } from "../../../types/UserContext.ts";

const userService = new UserService();

export async function profileRenderRouter(
  page: ProfilePage,
  profileContext: ProfileContext,
  viewer: UserContext,
) {
  try {
    switch (page) {
      case 'main': {
        const userStats: MainProfileStats = userService.getUserByDiscordId(profileContext.user.id);

        if (!userStats) return null;

        logger.info(`[${viewer.username}] User has selected to view [${profileContext.user.username}] main profile`);        

        return renderMainProfileEmbed(profileContext, userStats);
      }

      default:
        throw new Error(`Unknown profile page: (${page})`);
    }
  } catch(error) {
    throw error;
  }
}
