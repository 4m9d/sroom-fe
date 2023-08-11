'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import Button from '../../../ui/button/Button';

type Props = {};

export default function CourseDetailDrawer({}: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const animationConfig = {
    animate: controls,
    variants: {
      initial: { width: 0 },
      animate: { width: '26rem' },
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
    <>
      {isDrawerOpen === false && (
        <Button
          onClick={drawerHandler}
          className='!px-10 !py-3 text-sm font-medium text-white bg-zinc-900 absolute top-[9rem] right-20'
        >
          {'강의 노트 / 퀴즈 보기'}
        </Button>
      )}
      <AnimatePresence>
        <motion.div
          {...animationConfig}
          className='relative bg-white shadow-lg shrink-0'
        >
          {isDrawerOpen && (
            <button
              type='button'
              onClick={drawerHandler}
              className='absolute shrink-0 btn btn-sm btn-circle btn-ghost right-5 top-5'
            >
              ✕
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
