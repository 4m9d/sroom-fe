import { ONE_MINUTE_IN_MS } from "../auth/auth";

// index, review query
export const CACHE_TIME = ONE_MINUTE_IN_MS * 30;
export const STALE_TIME = ONE_MINUTE_IN_MS * 5;

export const INDEX_LIMIT = 50;
export const INDEX_SKELETON_LIMIT = INDEX_LIMIT / 5;
export const REVIEW_LIMIT = 10;
