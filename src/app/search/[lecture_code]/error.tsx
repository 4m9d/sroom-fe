'use client';
import { useRouter } from 'next/navigation';
import {
  API_FETCH_ERROR,
  ErrorMessage,
  SESSION_ERROR
} from '@/src/api/ErrorMessage';
import useAuth from '@/src/hooks/useAuth';
import setErrorToast from '@/src/util/toast/setErrorToast';

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
    router.replace('/');
    router.refresh();
  } else if (error.cause === SESSION_ERROR) {
    logout();
  } else {
    setErrorToast(new Error(ErrorMessage.DEFAULT));
  }

  return null;
}
