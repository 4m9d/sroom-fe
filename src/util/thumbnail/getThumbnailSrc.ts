export const getThumbnailSrc = (src: string) => {
  if (src.endsWith('no_thumbnail.jpg')) {
    return '/image/thumbnail/default_thumbnail.webp';
  }
  return src;
};
