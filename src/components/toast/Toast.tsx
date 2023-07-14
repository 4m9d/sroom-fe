'use client';
import { AnimatePresence, motion } from 'framer-motion';

const Emoji = {
  success: '✅',
  error: '🚫'
} as const;

export default function Toast({ toast }: { toast: Toast }) {
  const { type, title, description, buttonLabel, buttonOnClick } = toast;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ repeat: 1, repeatType: 'reverse', repeatDelay: 3.4 }}
        className={`fixed alert h-14 flex items-center ${
          type === 'error' ? 'alert-error' : 'alert-success'
        } z-10 bottom-16 w-1/2 left-1/4`}
      >
        <span className='inline-block mr-2 align-middle'>{Emoji[type]}</span>
        <div>
          <h3 className='font-bold'>{title}</h3>
          <p className='text-xs'>{description}</p>
        </div>
        {buttonLabel && buttonOnClick && (
          <button onClick={buttonOnClick} className='btn btn-sm btn-ghost'>
            {buttonLabel}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
