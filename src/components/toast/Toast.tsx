'use client';
import { TOAST_DELAY } from '@/src/constants/toast/toast';
import { AnimatePresence, motion } from 'framer-motion';

const Emoji = {
  success: '✅',
  error: '🚫'
} as const;

export default function Toast({ toast }: { toast: CustomToast }) {
  const { type, title, description, buttonLabel, buttonOnClick } = toast;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        transition={{ repeat: 1, repeatType: 'reverse', repeatDelay: TOAST_DELAY }}
        className={`fixed alert h-14 flex items-center ${
          type === 'error' ? 'alert-error' : 'alert-success'
        } z-10 bottom-16 w-1/2 left-1/4`}
      >
        <div className='flex items-center justify-between'>
          <p className='text-sm font-bold'>
            <span className='inline-block mr-2 align-middle'>
              {Emoji[type]}
            </span>
            {title}
          </p>
          <div className='ml-10'>
            <p className='text-xs'>{description}</p>
          </div>
          {buttonLabel && buttonOnClick && (
            <button onClick={buttonOnClick} className='btn btn-sm btn-ghost'>
              {buttonLabel}
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
