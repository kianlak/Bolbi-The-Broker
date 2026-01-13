import { EmbedBuilder } from 'discord.js';
import path from 'path';

type CardRow = {
  pack_id: string;
  image_id: string;
  rarity: string;
  card_id: string;
  quantity: number;
  marketPrice: number;
  sellPrice: number;
};

const GENERATED_DIR = 'src/assets/images/packs/generated';

export function buildCardViewEmbed(card: CardRow) {
  const imagePath = path.join(
    GENERATED_DIR,
    `${card.image_id}.png`
  );

  const filename = path.basename(imagePath);

  const embed = new EmbedBuilder()
    .setTitle(`🃏 ${formatName(card.image_id)}`)
    .setDescription(
      [
        `📦 **Pack:** ${card.pack_id}`,
        `⭐ **Rarity:** ${card.rarity}`,
        `📊 **Owned:** ${card.quantity}`,
        '',
        `💰 **Market Value:** ${card.marketPrice.toLocaleString()}`,
        `🪙 **Sell Value:** ${card.sellPrice.toLocaleString()}`,
        '',
        `🆔 **Card ID:** \`${card.card_id}\``,
      ].join('\n')
    )
    .setImage(`attachment://${filename}`)
    .setColor(0x2b2d31)
    .setFooter({
      text: 'Kian Canes Metaverse Manager',
    });

  return {
    embed,
    file: {
      attachment: imagePath,
      name: filename,
    },
  };
}

function formatName(id: string) {
  return id
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}