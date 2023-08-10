import { useEffect } from 'react';

export default function useScript(
  id: string,
  url: string,
  onload: () => void,
  defer: boolean
) {
  useEffect(() => {
    const script = document.createElement('script');

    script.id = id;
    script.src = url;
    script.defer = defer;
    script.onload = onload;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [id, url, defer, onload]);
}
