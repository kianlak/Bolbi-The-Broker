export function parseImageId(
  imageId: string,
  packId: string
) {
  const remainder = imageId.slice(packId.length + 1);

  const [finish, ...rest] = remainder.split('_');

  return {
    finish: finish.toUpperCase(),
    cardTemplateId: rest.join('_'),
  };
}
