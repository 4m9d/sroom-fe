//search results (16:9 ratio)
export const THUMBNAIL_PREVIEW_HEIGHT = {
  MEDIUM: 'md:h-28',
  LARGE: 'lg:h-60'
} as const;
export const THUMBNAIL_PREVIEW_WIDTH = {
  MEDIUM: 'md:w-[calc(7rem * 1.78)]',
  LARGE: 'lg:w-[calc(15rem * 1.78)]'
} as const;
export  const THUMBNAIL_PREVIEW_MIN_WIDTH = {
  MEDIUM: 'md:min-w-[calc(7rem*1.78)]',
  LARGE: 'lg:min-w-[calc(15rem*1.78)]'
} as const;