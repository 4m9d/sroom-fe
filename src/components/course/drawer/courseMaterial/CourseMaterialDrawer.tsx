'use client';
import useWindowSize from '@/src/hooks/useWindowSize';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import CourseMaterialContent from './CourseMaterialContent';
import { COURSE_MATERIAL_BREAKPOINT } from '@/src/constants/window/window';

type Props = {
  courseVideoId: number;
};

export default function CourseMaterialDrawer({ courseVideoId }: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useWindowSize();

  const drawerAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.25 },
    variants: {
      initial: { width: '0%' },
      animate: { width: '40%', maxWidth: '30rem' },
      exit: { width: '0%' }
    }
  };
  const drawerContentAnimationConfig = {
    initial: { opacity: 0, translateX: '100%' },
    animate: { opacity: 1, translateX: '0%' },
    exit: { opacity: 0, translateX: '100%' },
    transition: { ease: 'easeInOut', duration: 0.2 }
  };
  const bottomSheetAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.25 },
    variants: {
      initial: { height: '0%' },
      animate: { height: '60%', maxHeight: '35rem' },
      exit: { height: '0%' }
    }
  };
  const bottomSheetContentAnimationConfig = {
    initial: { opacity: 0, translateY: '100%' },
    animate: { opacity: 1, translateY: '0%' },
    exit: { opacity: 0, translateY: '100%' },
    transition: { ease: 'easeInOut', duration: 0.25 }
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

  if (width > COURSE_MATERIAL_BREAKPOINT) {
    return (
      <AnimatePresence>
        <motion.aside
          {...drawerAnimationConfig}
          className='relative h-full max-h-full min-h-full shadow-lg bg-sroom-white shrink-0'
        >
          {isDrawerOpen && (
            <AnimatePresence>
              <motion.div
                className='h-full'
                {...drawerContentAnimationConfig}
              >
                <CourseMaterialContent
                  courseVideoId={courseVideoId}
                  drawerHandler={drawerHandler}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.aside>
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.aside
          {...bottomSheetAnimationConfig}
          className='absolute bottom-0 z-50 max-w-full min-w-full max-h-[35rem] shadow-2xl bg-sroom-white shrink-0'
        >
          {isDrawerOpen && (
            <AnimatePresence>
              <motion.div
                className='h-full'
                {...bottomSheetContentAnimationConfig}
              >
                <CourseMaterialContent
                  courseVideoId={courseVideoId}
                  drawerHandler={drawerHandler}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.aside>
      </AnimatePresence>
    );
  }
}
