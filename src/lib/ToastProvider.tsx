'use client';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState
} from 'react';

type ToastContextType = {
  toasts: Toast[];
  setToasts: Dispatch<SetStateAction<Toast[]>>;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  setToasts: () => {}
});

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = {
    toasts,
    setToasts
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export default ToastProvider;
