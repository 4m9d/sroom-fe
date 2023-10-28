import { SESSION_AGE } from '@/src/constants/time/time';

export default function getSessionExpiresAt() {
  return Math.floor(Date.now() / 1000) + SESSION_AGE;
}
