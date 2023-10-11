import { useCallback, useRef } from 'react';

export default function useIntersectionObserver(
  setId: React.Dispatch<React.SetStateAction<string>>,
  root: HTMLElement | null,
  rootMargin?: string
) {
  const option = {
    threshold: [0.1, 0.5, 0.9],
    root,
    rootMargin
  };

  const checkIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setId(entry.target.id);
        }
      });
    },
    [setId]
  );

  const observer = useRef(new IntersectionObserver(checkIntersect, option));

  const observe = (element: HTMLElement) => {
    observer.current.observe(element);
  };

  const unobserve = (element: HTMLElement) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
}
