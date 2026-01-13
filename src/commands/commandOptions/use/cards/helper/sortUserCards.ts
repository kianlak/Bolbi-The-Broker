import { GLOBAL_CARD_FINISH_ODDS } from '../constants/CARD_FINISH_ODDS.ts';
import { parseImageId } from './parseImageId.ts';

import type { UserCardRow } from '../../../../../services/userCard/types/userCardRow.ts';

export function sortUserCards(rows: UserCardRow[]) {
  return rows
    .map(row => {
      const { finish, cardTemplateId } = parseImageId(
        row.image_id,
        row.pack_id,
      );

      return {
        ...row,
        finish,
        cardTemplateId,
        cardId: row.card_id,
      };
    })
    .sort((a, b) => {
      // 1️⃣ pack
      if (a.pack_id !== b.pack_id) {
        return a.pack_id.localeCompare(b.pack_id);
      }

      // 2️⃣ rarity (DB value, rarest first)
      const rarityDiff =
        rarityPriority(b.rarity) - rarityPriority(a.rarity);
      if (rarityDiff !== 0) return rarityDiff;

      // 3️⃣ card name (GROUP finishes together)
      const nameDiff =
        a.cardTemplateId.localeCompare(b.cardTemplateId);
      if (nameDiff !== 0) return nameDiff;

      // 4️⃣ finish (rarest finish first)
      const finishDiff =
        finishPriority(b.finish) - finishPriority(a.finish);
      if (finishDiff !== 0) return finishDiff;

      return 0;
    });
}

/* ---------- helpers ---------- */

function rarityPriority(rarity: string): number {
  switch (rarity) {
    case 'EPIC': return 4;
    case 'SUPER_RARE': return 3;
    case 'RARE': return 2;
    case 'COMMON': return 1;
    default: return 0;
  }
}

function finishPriority(finish: string): number {
  const sorted = Object.entries(GLOBAL_CARD_FINISH_ODDS)
    .sort((a, b) => a[1] - b[1]); // lower odds = rarer

  const index = sorted.findIndex(([f]) => f === finish);
  return index === -1 ? 0 : sorted.length - index;
}

