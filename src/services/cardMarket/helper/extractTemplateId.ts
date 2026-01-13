import type { CardFinish } from "../../../commands/commandOptions/use/cards/types/CardFinish.ts";

const CARD_FINISHES: CardFinish[] = [
  'DIRTY',
  'NORMAL',
  'GOLD',
  'HOLO',
  'DIAMOND',
  'MOB',
];

export function extractCardTemplateId(imageId: string): string {
  for (const finish of CARD_FINISHES) {
    const token = `_${finish}_`;
    if (imageId.includes(token)) {
      return imageId.split(token)[1];
    }
  }

  throw new Error(`Invalid image_id format: ${imageId}`);
}
