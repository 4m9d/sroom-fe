'use client';
import { TOAST_DELAY } from '@/src/constants/ui/toast';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './button/Button';
import Image from 'next/image';

const Emoji: Emoji = {
  lecture_enrollment: '🤓',
  error: '🚫'
};

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
        className={`fixed h-24 flex !z-[9999] w-[88%] md:w-[88%] lg:w-[60%] px-7 py-6 justify-between  md:bottom-10 lg:bottom-14 left-[calc(6%)] lg:left-[20%] items-center gap-5 shadow-xl ${
          type === 'error'
            ? 'bg-red-400'
            : type === 'lecture_enrollment'
            ? 'bg-white'
            : ''
        }`}
      >
        <div className='flex items-center gap-7 shrink-0'>
          <p className='text-xl font-bold'>
            <span className='mr-2 text-xl'>{Emoji[type]}</span>
            {title}
          </p>
          <p
            className={`text-sm ${
              type === 'error'
                ? 'text-black'
                : type === 'lecture_enrollment'
                ? 'text-zinc-500'
                : ''
            }`}
          >
            {description}
          </p>
        </div>
        <div className='w-[12rem] h-12 text-white'>
          {buttonLabel && buttonOnClick && (
            <Button
              onClick={buttonOnClick}
              className='flex items-center justify-center !px-7 !py-4 w-full h-full bg-orange-500'
            >
              {type === 'lecture_enrollment' && (
                <Image
                  className='w-auto h-auto mr-3'
                  src={'/icon/icon_lecture_white.svg'}
                  alt='재생 버튼'
                  width={20}
                  height={20}
                />
              )}
              <span className='text-sm font-bold'>{buttonLabel}</span>
            </Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
