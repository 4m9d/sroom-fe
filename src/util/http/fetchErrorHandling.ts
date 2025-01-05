import { signOut } from 'next-auth/react';
import {
  API_FETCH_ERROR,
  ErrorMessage,
  SESSION_ERROR
} from '@/src/api/ErrorMessage';
import { UNAUTHORIZED } from '@/src/constants/query/query';
import setErrorToast from '../toast/setErrorToast';

export async function fetchErrorHandling(res: Response, errorMessage: string) {
  const response = await res.json();

  if (res.status === UNAUTHORIZED || response.staus_code === UNAUTHORIZED) {
    await signOut();
    return Promise.reject(
      new Error(ErrorMessage.UNAUTHORIZED, { cause: SESSION_ERROR })
    );
  } else {
    setErrorToast(new Error(errorMessage));
    return Promise.reject(new Error(errorMessage, { cause: API_FETCH_ERROR }));
  }
  return null;
}
