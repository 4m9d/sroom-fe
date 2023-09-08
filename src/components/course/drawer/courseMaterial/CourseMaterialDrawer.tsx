'use client';
import useWindowSize from '@/src/hooks/useWindowSize';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const TABLET_BREAKPOINT = 768;

export default function CourseMaterialDrawer() {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useWindowSize();

  const drawerAnimationConfig = {
    animate: controls,
    variants: {
      initial: { width: '0%' },
      animate: { width: '40%', maxWidth: '25rem' },
      exit: { width: '0%' }
    }
  };
  const bottomSheetAnimationConfig = {
    animate: controls,
    variants: {
      initial: { height: '0%' },
      animate: { height: '60%', maxHeight: '35rem' },
      exit: { height: '0%' }
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

  useEffect(() => {
    const button = document.getElementById(
      'course-material-drawer'
    ) as HTMLButtonElement;
    button.addEventListener('click', drawerHandler);
    return () => {
      button.removeEventListener('click', drawerHandler);
    };
  }, [drawerHandler]);

  useEffect(() => {
    controls.start('exit');
    setIsDrawerOpen(false);
  }, [width, controls]);

  if (width > TABLET_BREAKPOINT) {
    return (
      <AnimatePresence>
        <motion.aside
          {...drawerAnimationConfig}
          className='relative max-h-full min-h-full shadow-lg bg-sroom-white shrink-0'
        >
          <div className='w-full h-full'></div>
          {isDrawerOpen && (
            <button
              type='button'
              onClick={drawerHandler}
              className='absolute shrink-0 btn btn-sm btn-circle btn-ghost right-5 top-5'
            >
              ✕
            </button>
          )}
        </motion.aside>
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.aside
          {...bottomSheetAnimationConfig}
          className='absolute bottom-0 z-50 max-w-full min-w-full shadow-lg bg-sroom-white shrink-0'
        >
          <div className='w-full '></div>
          {isDrawerOpen && (
            <button
              type='button'
              onClick={drawerHandler}
              className='absolute shrink-0 btn btn-sm btn-circle btn-ghost right-5 top-5'
            >
              ✕
            </button>
          )}
        </motion.aside>
      </AnimatePresence>
    );
  }
}
