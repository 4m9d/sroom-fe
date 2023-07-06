import { useContext } from 'react';
import { ToastContext } from '../lib/ToastProvider';

export default function useToast() {
  const { toasts, setToasts } = useContext(ToastContext);
  const TOAST_TIMEOUT = 5 * 1000;

  const removeToast = () => {
    const poppedToasts = toasts.slice(1);
    setToasts(poppedToasts);
  };

  const setToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => removeToast(), TOAST_TIMEOUT);
  };

  return { toasts, setToast };
}
