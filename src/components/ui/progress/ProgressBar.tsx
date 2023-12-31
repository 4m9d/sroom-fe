'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  className?: string;
  value: number;
};

export default function ProgressBar({ className, value }: Props) {
  return (
    <AnimatePresence>
      <motion.div className={`${className} w-full h-[6px] bg-sroom-white`}>
        <motion.div
          className='h-full bg-sroom-brand'
          initial={{ width: '0%' }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.4,
            delay: 0.2
          }}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
