'use client';
import useToast from '../hooks/useToast';

export default function GlobalError({
  error,
  reset
}: {
  error: ErrorToast;
  reset: () => void;
}) {
  const { setErrorToast } = useToast();

  console.error('에러', error);
  setErrorToast(error);

  return <></>;
}
