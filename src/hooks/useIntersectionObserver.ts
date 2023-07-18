import { useCallback, useRef } from 'react';

export default function useIntersectionObserver(
  setId: (id: string) => void,
  rootMargin: string,
  root: HTMLElement | null
) {
  const option = {
    threshold: [0, 0.25, 0.75, 1],
    rootMargin,
    root
  };
  const QUARTER = 0.25;

  const entryIsDominant = (entry: IntersectionObserverEntry) => {
    return entry.isIntersecting && (entry.intersectionRect.height / entry.rootBounds!.height) >= QUARTER;
  };

  const checkIntersect = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entryIsDominant(entry)) {
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
