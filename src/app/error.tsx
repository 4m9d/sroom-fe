'use client';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { useRouter } from 'next/navigation';
import {
  API_FETCH_ERROR,
  ErrorMessage,
  SESSION_ERROR
} from '../api/ErrorMessage';
import useAuth from '../hooks/useAuth';

export default function ErrorHandler({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const { logout } = useAuth();

  if (error.cause === API_FETCH_ERROR) {
    setErrorToast(error);
    router.back();
  } else if (error.cause === SESSION_ERROR) {
    setErrorToast(error);
    logout();
  } else {
    setErrorToast(new Error(ErrorMessage.DEFAULT));
  }

  return null;
}
