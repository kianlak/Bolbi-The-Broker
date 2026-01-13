import { EmbedBuilder } from 'discord.js';

type BinderRow = {
  pack_id: string;
  rarity: string;
  finish: string;
  cardTemplateId: string;
  quantity: number;
  cardId: string;
  marketPrice: number;
  sellPrice: number;
};

export function buildBinderEmbed(
  username: string,
  rows: BinderRow[]
) {
  const embed = new EmbedBuilder()
    .setTitle(`📘 ${username}'s Card Binder`)
    .setColor(0x2b2d31)
    .setTimestamp();

  if (!rows.length) {
    embed.setDescription('📭 This binder is empty.');
    return embed;
  }

  let currentPack: string | null = null;
  let currentRarity: string | null = null;
  let currentCard: string | null = null;

  const lines: string[] = [];

  for (const row of rows) {
    if (row.pack_id !== currentPack) {
      currentPack = row.pack_id;
      currentRarity = null;
      currentCard = null;

      lines.push(
        `\n📦 **${formatPackName(row.pack_id)}**`
      );
    }

    if (row.rarity !== currentRarity) {
      currentRarity = row.rarity;
      currentCard = null;

      lines.push(
        `\n${rarityEmoji(row.rarity)} **${formatRarity(row.rarity)}**`
      );
    }

    if (row.cardTemplateId !== currentCard) {
      if (currentCard !== null) {
        lines.push(''); // spacing between cards
      }
      currentCard = row.cardTemplateId;
    }

    lines.push(
      `**${formatName(row.cardTemplateId)}** ` +
      `(${finishEmoji(row.finish)} ${normalizeFinish(row.finish)}) ` +
      `x${row.quantity} ` +
      `💰 **${row.marketPrice.toLocaleString()}** ` +
      `${formatCardId(row.cardId)}`
    );
  }

  embed.setDescription(lines.join('\n'));
  embed.setFooter({
    text: 'Kian Canes Metaverse Manager',
  });

  return embed;
}

function formatPackName(packId: string): string {
  return packId.replace(/_/g, ' ').toUpperCase();
}

function formatRarity(rarity: string): string {
  return rarity.replace('_', ' ');
}

function normalizeFinish(finish: string): string {
  return finish.toUpperCase();
}

function rarityEmoji(r: string) {
  switch (r.toUpperCase()) {
    case 'EPIC': return '🟣';
    case 'SUPER_RARE': return '🟡';
    case 'RARE': return '🔵';
    case 'COMMON': return '⚪';
    default: return '❓';
  }
}

function finishEmoji(f: string) {
  switch (normalizeFinish(f)) {
    case 'DIAMOND': return '💎';
    case 'MOB': return '🫂';
    case 'GOLD': return '🪙';
    case 'HOLO': return '✨';
    case 'DIRTY': return '🤢';
    case 'NORMAL': return '⬜';
    default: return '❓';
  }
}

function formatName(templateId: string) {
  return templateId
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatCardId(cardId?: string) {
  return cardId ? `[\`${cardId}\`]` : '[—]';
}