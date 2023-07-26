'use client';
import setErrorToast from '@/src/util/error/setErrorToast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: ErrorToast;
  reset?: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('에러', error);
    setErrorToast(error);
    router.back();
  }, []);

  return null;
}
