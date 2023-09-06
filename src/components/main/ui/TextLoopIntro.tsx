'use client';
import {
  MOTIVATION_GENERAL,
  MOTIVATION_SPECIFIC
} from '@/src/constants/motivation/motivation';
import { motion } from 'framer-motion';

const TextLoop = ({
  className,
  type,
  duration,
  delayGap,
  children
}: {
  className: string;
  type: 'main' | 'back-up';
  duration: number;
  delayGap: number;
  children: React.ReactNode;
}) => {
  const delay = duration - delayGap;
  const repeatDelay = delay - delayGap;

  return (
    <motion.div
      initial={{ transform: 'translate3d(0%, 0, 0)' }}
      animate={{
        transform: 'translate3d(-100%, 0, 0)'
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: repeatDelay,
        delay: type === 'back-up' ? delay : 0
      }}
      className={`${className} pl-[100%] absolute flex h-full min-w-full gap-3 whitespace-nowrap text-[5px] sm:text-sm md:text-lg lg:text-xl xl:text-2xl opacity-90`}
    >
      {children}
    </motion.div>
  );
};

export default function TextLoopIntro({}) {
  return (
    <div className='relative col-start-1 col-end-2 row-start-5 row-end-6 overflow-hidden bg-sroom-black-300'>
      <TextLoop
        type='main'
        duration={20}
        delayGap={2}
        className='top-[20%]'
      >
        {MOTIVATION_GENERAL.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop
        duration={20}
        delayGap={2}
        type='back-up'
        className='top-[20%]'
      >
        {MOTIVATION_GENERAL.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop
        type='main'
        duration={20}
        delayGap={3}
        className='top-[60%]'
      >
        {MOTIVATION_SPECIFIC.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
      <TextLoop
        type='back-up'
        duration={20}
        delayGap={3}
        className='top-[60%]'
      >
        {MOTIVATION_SPECIFIC.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </TextLoop>
    </div>
  );
}
