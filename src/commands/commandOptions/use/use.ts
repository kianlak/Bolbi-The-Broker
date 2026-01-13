import { ITEM_ALIASES } from '../inventory/constants/ITEM_ALIASES.ts';

import { InventoryService } from '../../../services/inventory/inventoryService.ts';

export async function use({ message, args, user }: any) {
  if (!args?.length) {
    return message.reply('Usage: +use <itemId>');
  }

  const resolved =
    ITEM_ALIASES[args[0].toLowerCase()] ?? args[0];

  try {
    await new InventoryService().useItem(
      user.id,
      resolved,
      message.channel
    );
  } catch (err) {
    console.error(err);
    await message.reply('❌ Failed to use item');
  }
}
