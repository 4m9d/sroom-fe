import { useEffect, useState } from 'react';

export default function useAlert() {
  const [alert, setAlert] = useState<Alert>();
  const [show, setShow] = useState(true);
  const AUTO_CLOSE = 3 * 1000;

  useEffect(() => {
    if (alert) {
      setShow(true);
      console.log('alert 설정!', alert);
      setTimeout(() => {
        setShow(false);
      }, AUTO_CLOSE);
    }
  }, [alert, AUTO_CLOSE]);

  return { alert, setAlert, show, setShow };
}
