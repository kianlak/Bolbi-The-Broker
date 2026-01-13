import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { CARD_PACK_REGISTRY } from '../../use/cards/constants/CARD_PACK_REGISTRY.ts';

export function buildPackSelectMenu(
  viewerId: string,
  targetId: string,
  packs: string[]
) {
  const options = packs.map(packId => {
    const pack = Object.values(CARD_PACK_REGISTRY)
      .find(p => p.packId === packId);

    return {
      label: pack
        ? `${capitalize(pack.packName)} (${pack.version})`
        : packId,
      value: packId,
    };
  });

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`binder:pack:${viewerId}:${targetId}`)
      .setPlaceholder('Select a card pack')
      .addOptions(options)
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}