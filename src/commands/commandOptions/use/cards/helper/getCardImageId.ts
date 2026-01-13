import { getCardTemplateId } from "./getCardTemplateId.ts";

export function getCardImageId(
  packName: string,
  finish: string,
  filename: string
): string {
  return `${packName}_${finish}_${getCardTemplateId(filename)}`;
}