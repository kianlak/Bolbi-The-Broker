export function getCardTemplateId(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '');
}

