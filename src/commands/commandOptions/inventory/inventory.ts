import { logger } from "../../../shared/logger.ts";

import { getMessageChannelName } from "../../../helper/getMessageChannelName.ts";
import { buildInventoryEmbed } from "./ui/buildInventoryEmbed.ts";
import { InventoryService } from "../../../services/inventory/inventoryService.ts";

import type { CommandContext } from "../../types/CommandContext.ts";

export async function inventory({ message, user }: CommandContext) {
  logger.starting(`[${user.username}] Starting "inventory" in ${getMessageChannelName(message)}`);
  
  const username = user.username ?? '';

  const inventoryService = new InventoryService();

  // inventoryService.addItem(
  //   `${user.id}`,
  //   'cringeboard_pack_v1',
  //   2
  // );

  const inventory = inventoryService.getInventoryGrouped(user.id);
  const embed = buildInventoryEmbed(username, message.author.avatarURL(), inventory);

  await message.reply({ embeds: [embed] });
}