'use client';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  message: string;
  type: 'success' | 'error';
};

export default function FeedbackMessage({ message, type }: Props) {
  return (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`text-xs font-medium ${
          type === 'success'
            ? 'text-sroom-green'
            : type === 'error'
            ? 'text-sroom-red'
            : ''
        }`}
      >
        {message}
      </motion.span>
    </AnimatePresence>
  );
}
