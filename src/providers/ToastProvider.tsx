'use client';
import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/toast/Toast';

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  setToasts: () => {}
});

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [portal, setportal] = useState<Element | null>(null);
  const value = { toasts, setToasts };

  useEffect(() => {
    setportal(document.getElementById('toast'));
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.length > 0 && portal !== null
        ? createPortal(
            toasts.map((toast) => <Toast key={toast.id} toast={toast} />),
            portal
          )
        : null}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
