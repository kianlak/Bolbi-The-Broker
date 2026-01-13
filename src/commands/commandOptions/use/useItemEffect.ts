import { useCardPack } from './cards/useCardPack.ts';

export async function useItemEffect({
  item,
  discord_id,
  channel,
}: {
  item: any;
  discord_id: string;
  channel: any;
}) {
  switch (item.category) {
    case 'CARD_PACKS':
      return useCardPack(item, discord_id, channel);

    default:
      throw new Error('Item not usable');
  }
}