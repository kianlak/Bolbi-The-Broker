import crypto from 'crypto';

export function generateCardId(
  ownerId: string,
  imageId: string
): string {
  return crypto
    .createHash('sha256')
    .update(`${ownerId}:${imageId}`)
    .digest('hex')
    .slice(0, 10);
}
