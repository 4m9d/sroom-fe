import {
  API_FETCH_ERROR,
  ErrorMessage,
  SESSION_ERROR
} from '@/src/api/ErrorMessage';
import { UNAUTHORIZED } from '@/src/constants/query/query';

export function fetchErrorHandling(res: Response, errorMessage: string) {
  if (res.status === UNAUTHORIZED) {
    return Promise.reject(
      new Error(ErrorMessage.UNAUTHORIZED, { cause: SESSION_ERROR })
    );
  } else {
    return Promise.reject(new Error(errorMessage, { cause: API_FETCH_ERROR }));
  }
}
