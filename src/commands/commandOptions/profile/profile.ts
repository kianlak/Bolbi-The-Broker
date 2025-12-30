import { logger } from "../../../shared/logger.ts";

import { buildProfileDropdownSelection } from "./data/buildProfileDropdownSelection.ts";
import { profileRenderRouter } from "./profileRouter.ts";
import { getMessageChannelName } from "../../../helper/getMessageChannelName.ts";
import { buildProfileContextFromUser } from "./data/buildProfileContextFromUserId.ts";
import { buildProfileContextForTarget } from "./data/buildProfileContestForTarget.ts";

import type { CommandContext } from "../../types/CommandContext.ts";

export async function profile({ message, args = [], user }: CommandContext) {
  const commandName = profile.name;

  logger.starting(`[${user.username}] Starting "${commandName}" in ${getMessageChannelName(message)}`);

  try {
    const viewerId = user.id;
    const targetId = args[0] ?? viewerId;

    const profileContext =
      targetId === viewerId
        ? await buildProfileContextFromUser(message.author)
        : await buildProfileContextForTarget(message.client, targetId);

    if(!profileContext) {
      await message.reply(`❌ **Error fetching user with id ${targetId}**`);

      logger.warn(`[${user.username}] Could not fetch user with id ${targetId}`);

      return null;
    }

    const menuRow = buildProfileDropdownSelection(viewerId, targetId);
    const embed = await profileRenderRouter('main', profileContext, user);

    if (!embed) {
      const client = message.client;
      const userTarget = await client.users.fetch(targetId);

      await message.reply(`❌ **No profile data found for ${profileContext.user.username}**`);

      logger.warn(`[${user.username}] User [${userTarget.username}] does not exist in the DB`);
      return;
    }

    const reply = await message.reply({
      embeds: [embed],
      components: [menuRow],
    });

    logger.success(`[${user.username}] Command "${commandName}" complete`);
  } catch (error) {
    logger.error(`[${user.username}] Command "${commandName}" failed`, error);
  }
}
