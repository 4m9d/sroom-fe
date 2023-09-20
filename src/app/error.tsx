'use client';
import { useEffect } from 'react';
import setErrorToast from '../util/toast/setErrorToast';

export default function GlobalError({
  error,
  reset
}: {
  error: ErrorToast;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('에러', error);
    setErrorToast(error);
    reset();
  }, [error, reset]);

  return null;
}
