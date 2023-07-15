export const QueryKeys = {
  REFRESH: 'refresh',
  SEARCH: 'search'
} as const;

type QueryKeys = (typeof QueryKeys)[keyof typeof QueryKeys];
