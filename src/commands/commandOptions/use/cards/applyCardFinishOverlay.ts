import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

import { CARD_FINISH_OVERLAY_MAP } from './constants/CARD_FINISH_OVERLAY_MAP.ts';

import { getCardTemplateId } from './helper/getCardTemplateId.ts';
import { getCardImageId } from './helper/getCardImageId.ts';

import type { CardFinish } from './types/CardFinish.ts';

const OVERLAY_BASE_PATH = './src/assets/images/packs/card_finish';
const OUTPUT_DIR = './src/assets/images/packs/generated';

export async function applyCardFinishOverlay({
  baseImagePath,
  packId,
  finish,
}: {
  baseImagePath: string;
  packId: string;
  finish: CardFinish;
}): Promise<{
  imageId: string;
  imagePath: string;
}> {
  const filename = path.basename(baseImagePath);
  const templateId = getCardTemplateId(filename);
  const imageId = getCardImageId(packId, finish, filename);

  const outputName = `${imageId}.png`;
  const outputPath = path.join(OUTPUT_DIR, outputName);

  try {
    await fs.access(outputPath);
    return { imageId, imagePath: outputPath };
  } catch {
  }

  const overlayFile = CARD_FINISH_OVERLAY_MAP[finish];

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  if (!overlayFile) {
    await fs.copyFile(baseImagePath, outputPath);
    return { imageId, imagePath: outputPath };
  }

  const overlayPath = path.join(OVERLAY_BASE_PATH, overlayFile);

  const baseMeta = await sharp(baseImagePath).metadata();
  if (!baseMeta.width || !baseMeta.height) {
    throw new Error('Failed to read base image dimensions');
  }

  const cardWidth = baseMeta.width;
  const cardHeight = baseMeta.height;

  const resizedOverlay = sharp(overlayPath)
    .resize(cardWidth, cardHeight, {
      fit: 'cover',
      position: 'centre',
    })
    .ensureAlpha();

  const overlayBuffer = await resizedOverlay
    .extract({
      left: 0,
      top: 0,
      width: cardWidth,
      height: cardHeight,
    })
    .toBuffer();

  await sharp(baseImagePath)
    .composite([
      {
        input: overlayBuffer,
        blend: 'overlay',
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toFile(outputPath);

  return { imageId, imagePath: outputPath };
}
