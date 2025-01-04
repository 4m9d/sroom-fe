import { defaultThumbnail } from '@/public/images/images';

export const getThumbnailSrc = (src: string) => {
  if (src.endsWith('no_thumbnail.jpg')) {
    return defaultThumbnail.default.src;
  }
  return src;
};
