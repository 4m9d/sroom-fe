import { useEffect } from 'react';

export default function useScript(
  id: string,
  url: string,
  onload: () => void,
  async: boolean
) {
  useEffect(() => {
    const script = document.createElement('script');

    script.id = id;
    script.src = url;
    script.async = async;
    script.onload = onload;

    document.head.appendChild(script);
  }, [id, url, async, onload]);
}
