//(16:9 ratio)
export const THUMBNAIL_PREVIEW_HEIGHT = {
  MEDIUM: 'md:h-28',
  LARGE: 'lg:h-56',
  XLARGE: 'xl:h-[calc(21rem)]'
} as const;
export const THUMBNAIL_PREVIEW_MIN_WIDTH = {
  MEDIUM: 'md:min-w-[calc(7rem*1.78)]',
  LARGE: 'lg:min-w-[calc(14rem*1.78)]',
  XLARGE: 'xl:min-w-[calc(21rem*1.78)]'
} as const;