'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

type Props = {};

export default function CourseMaterialDrawer({}: Props) {
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

  useEffect(() => {
    const button = document.getElementById(
      'course-material-drawer'
    ) as HTMLButtonElement;
    button.addEventListener('click', drawerHandler);
    return () => {
      button.removeEventListener('click', drawerHandler);
    };
  }, [drawerHandler]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          {...animationConfig}
          className='relative max-h-full min-h-full bg-white shadow-lg shrink-0'
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
