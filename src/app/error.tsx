'use client';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { API_FETCH_ERROR, ErrorMessage } from '../api/ErrorMessage';

export default function ErrorHandler({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (error.cause === API_FETCH_ERROR) {
      setErrorToast(error);
      router.back();
    } else {
      setErrorToast(new Error(ErrorMessage.DEFAULT));
    }
    return () => router.refresh();
  }, [error, router]);

  return null;
}
