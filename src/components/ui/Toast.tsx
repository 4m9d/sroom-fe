'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './button/Button';
import LectureSVG from '@/public/icon/Lecture';

const Emoji: Emoji = {
  lecture_enrollment: '🤓',
  error: '🚫'
};

const TOAST_DELAY = 4;

export default function Toast({ toast }: { toast: CustomToast }) {
  const { type, title, description, buttonLabel, buttonOnClick } = toast;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        exit={{ y: 200 }}
        transition={{
          repeat: 1,
          repeatType: 'reverse',
          repeatDelay: TOAST_DELAY - 0.25
        }}
        role='alert'
        className={`fixed h-[5.5rem] z-50 flex w-[88%] lg:w-[60%] px-7 py-6 justify-between bottom-10 lg:bottom-14 left-[calc(6%)] lg:left-[20%] items-center gap-5 shadow-xl text-sroom-black-400 ${
          type === 'error'
            ? 'bg-red-400'
            : type === 'lecture_enrollment'
            ? 'bg-sroom-white'
            : ''
        }`}
      >
        <div className='flex items-center gap-7 shrink-0'>
          <p className='text-base font-bold lg:text-xl'>
            <span className='mr-2'>{Emoji[type]}</span>
            {title}
          </p>
          <p
            className={`${
              type === 'lecture_enrollment' ? 'hidden' : 'block'
            } sm:block text-xs md:text-sm ${
              type === 'error'
                ? 'text-sroom-black-400'
                : type === 'lecture_enrollment'
                ? 'text-sroom-black-200'
                : ''
            }`}
          >
            {description}
          </p>
        </div>
        <div className='w-[35%] h-12 min-w-[5rem] max-w-[12rem] text-sroom-white'>
          {buttonLabel && buttonOnClick && (
            <Button
              onClick={buttonOnClick}
              className='flex items-center justify-center w-full h-full bg-sroom-brand'
            >
              {type === 'lecture_enrollment' && (
                <span className='w-3 mr-3 align-middle md:w-5 stroke-sroom-white fill-sroom-white'>
                  <LectureSVG />
                </span>
              )}
              <span className='text-xs font-bold md:text-sm'>
                {buttonLabel}
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
