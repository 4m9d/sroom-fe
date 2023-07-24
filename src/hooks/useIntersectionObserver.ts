import { useCallback, useRef } from 'react';

export default function useIntersectionObserver(
  setId: (id: string) => void,
  rootMargin: string,
  root: HTMLElement | null
) {
  const option = {
    threshold: 0,
    rootMargin,
    root
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
