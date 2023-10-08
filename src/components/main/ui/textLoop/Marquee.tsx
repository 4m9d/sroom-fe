'use client';
import { motion } from 'framer-motion';

export default function Marquee({
  className,
  type,
  children
}: {
  className?: string;
  type: 'main' | 'back-up';
  children: React.ReactNode;
}){
  return (
    <motion.div
      initial={{ transform: 'translate3d(0%, 0, 0)' }}
      animate={{
        transform: 'translate3d(calc(-100%), 0, 0)'
      }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity
      }}
      className={`${className} flex shrink-0 items-center justify-around h-full min-w-full gap-3 whitespace-nowrap leading-3 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl opacity-90`}
    >
      {children}
    </motion.div>
  );
};
