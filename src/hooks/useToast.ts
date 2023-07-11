import { useContext } from 'react';
import { ToastContext } from '../providers/ToastProvider';
import getErrorObject from '../util/getErrorObject';
import { TOAST_TIMEOUT } from '../constants/toast/toast';
import getRandomID from '../util/getRandomID';

export default function useToast() {
  const { toasts, setToasts } = useContext(ToastContext);

  const removeToast = (id: number) => {
    setToasts((prev: Toast[]) => prev.filter((toast) => toast.id !== id));
  };

  const setToast = (toast: Toast) => {
    const id = getRandomID();

    setToasts((prev: Toast[]) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(toast.id), TOAST_TIMEOUT);
  };

  const setErrorToast = (error: Error) => {
    setToast(getErrorObject(error.message));
  };

  return { toasts, setToast, setErrorToast };
}
