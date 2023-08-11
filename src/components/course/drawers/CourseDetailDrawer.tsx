'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type Props = {};

export default function CourseDetailDrawer({}: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const animationConfig = {
    animate: controls,
    variants: {
      initial: { width: 0 },
      animate: { width: '300px' },
      exit: { width: 0 }
    }
  };

  const drawerHandler = useCallback(() => {
    if (isDrawerOpen) {
      controls.start('exit');
      setIsDrawerOpen(false);
    } else {
      controls.start('animate');
      setIsDrawerOpen(true);
    }
  }, [controls, isDrawerOpen]);

  const backgroundClickHandler = useCallback(() => {
    if (isDrawerOpen) {
      drawerHandler();
    }
  }, [isDrawerOpen, drawerHandler]);

  useEffect(() => {
    const background = document.getElementById('background') as HTMLDivElement;
    background.addEventListener('click', backgroundClickHandler);

    return () => {
      background.removeEventListener('click', backgroundClickHandler);
    };
  }, [backgroundClickHandler]);

  return (
    <AnimatePresence>
      <motion.aside
        id='course-detail-drawer'
        {...animationConfig}
        className='relative bg-white shadow-lg shrink-0'
      >
        <button
          type='button'
          onClick={drawerHandler}
          className='absolute flex items-center justify-center w-5 h-12 bg-zinc-900 -right-5 top-[calc(50%-1.5rem)]'
        >
          <Image
            src='/icon/icon_arrow_right_white.svg'
            alt='사이드 바 버튼F'
            width={12}
            height={12}
            className={`${isDrawerOpen ? 'rotate-180' : ''} transition-all`}
          />
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
