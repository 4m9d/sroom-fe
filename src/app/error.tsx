'use client';
import { useEffect } from 'react';
import setErrorToast from '../util/error/setErrorToast';

export default function GlobalError({
  error,
  reset
}: {
  error: ErrorToast;
  reset?: () => void;
}) {

  useEffect(() => {
    console.error('에러', error);
    setErrorToast(error);
  }, []);

  return null;
}
