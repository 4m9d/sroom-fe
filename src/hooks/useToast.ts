import { useContext } from 'react';
import { ToastContext } from '../lib/ToastProvider';
import getErrorObject from '../util/getErrorObject';
import { TOAST_TIMEOUT } from '../constants/toast/toast';

export default function useToast() {
  const { toasts, setToasts } = useContext(ToastContext);

  const removeToast = () => {
    const poppedToasts = toasts.slice(1);
    setToasts(poppedToasts);
  };

  const setToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => removeToast(), TOAST_TIMEOUT);
  };

  const errorHandler = (error: Error) => {
    setToast(getErrorObject(error.message));
  }

  return { toasts, setToast, errorHandler };
}
