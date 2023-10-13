'use client';
import {
  API_FETCH_ERROR,
  ErrorMessage,
  SESSION_ERROR
} from '@/src/api/ErrorMessage';
import useAuth from '@/src/hooks/useAuth';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { useRouter } from 'next/navigation';

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
  } else if (error.cause === SESSION_ERROR) {
    logout();
  } else {
    setErrorToast(new Error(ErrorMessage.DEFAULT));
  }

  return null;
}
