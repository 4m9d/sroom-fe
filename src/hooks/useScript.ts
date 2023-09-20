import useWindowSize from '@/src/hooks/useWindowSize';
import { useEffect } from 'react';
import { BROWSER_MIN_WIDTH } from '../constants/window/window';

export default function useScript(
  id: string,
  url: string,
  onload: () => void,
  defer: boolean
) {
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (windowWidth < BROWSER_MIN_WIDTH) return;
    const script = document.createElement('script');

    script.id = id;
    script.src = url;
    script.defer = defer;
    script.onload = onload;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id, url, defer, onload, windowWidth]);
}
