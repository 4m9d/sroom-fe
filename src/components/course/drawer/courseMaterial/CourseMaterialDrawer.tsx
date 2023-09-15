'use client';
import useWindowSize from '@/src/hooks/useWindowSize';
import {
  AnimatePresence,
  PanInfo,
  motion,
  useAnimationControls,
  useMotionValue
} from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import CourseMaterialContent from './CourseMaterialContent';
import { COURSE_MATERIAL_BREAKPOINT } from '@/src/constants/window/window';

type Props = {
  courseVideoId: number;
};

const BOTTOM_SHEET_MAX_HEIGHT = 560;
const BOTTOM_SHEET_RESIZE_MIN = 100;
const DRAWER_MAX_WIDTH = 480;
const DRAWER_RESIZE_MIN = 250;

export default function CourseMaterialDrawer({ courseVideoId }: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const initialBottomSheetHeight =
    windowHeight * 0.6 < BOTTOM_SHEET_MAX_HEIGHT
      ? windowHeight * 0.6
      : BOTTOM_SHEET_MAX_HEIGHT;
  const initialDrawerWidth =
    windowWidth * 0.4 < DRAWER_MAX_WIDTH ? windowWidth * 0.4 : DRAWER_MAX_WIDTH;

  const bottomSheetHeight = useMotionValue(initialBottomSheetHeight);
  const drawerWidth = useMotionValue(initialDrawerWidth);

  const drawerAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.25 },
    variants: {
      initial: { width: 0 },
      animate: { width: windowWidth * 0.4, maxWidth: DRAWER_MAX_WIDTH },
      exit: { width: 0 }
    }
  };
  const drawerContentAnimationConfig = {
    initial: { opacity: 0, translateX: '100%' },
    animate: { opacity: 1, translateX: '0%' },
    exit: { opacity: 0, translateX: '100%' },
    transition: { ease: 'easeInOut', duration: 0.2 }
  };

  const drawerDragResizingConfig = {
    drag: 'x' as 'x',
    dragConstraints: {
      left: 0,
      right: 0
    },
    dragElastic: 0,
    dragMomentum: false,
    onDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      event.stopPropagation();

      drawerWidth.set(
        resizeRangeHandler(
          windowWidth - info.point.x,
          DRAWER_RESIZE_MIN,
          DRAWER_MAX_WIDTH
        )
      );
    }
  };
  const bottomSheetAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.25 },
    variants: {
      initial: { height: 0 },
      animate: {
        height: windowHeight * 0.6,
        maxHeight: BOTTOM_SHEET_MAX_HEIGHT
      },
      exit: { height: 0 }
    }
  };
  const bottomSheetContentAnimationConfig = {
    initial: { opacity: 0, translateY: '100%' },
    animate: { opacity: 1, translateY: '0%' },
    exit: { opacity: 0, translateY: '100%' },
    transition: { ease: 'easeInOut', duration: 0.25 }
  };

  const bottomSheetDragResizingConfig = {
    drag: 'y' as 'y',
    dragConstraints: {
      top: 0,
      bottom: 0
    },
    dragElastic: 0,
    dragMomentum: false,
    onDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      event.stopPropagation();

      bottomSheetHeight.set(
        resizeRangeHandler(
          windowHeight - info.point.y,
          BOTTOM_SHEET_RESIZE_MIN,
          BOTTOM_SHEET_MAX_HEIGHT
        )
      );
    }
  };

  const resizeRangeHandler = (value: number, min: number, max: number) => {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
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
  }, [windowWidth, controls]);

  if (windowWidth > COURSE_MATERIAL_BREAKPOINT) {
    return (
      <AnimatePresence>
        <motion.aside
          {...drawerAnimationConfig}
          style={{ width: drawerWidth }}
          className='flex h-full max-h-full min-h-full shadow-lg bg-sroom-white shrink-0'
        >
          {isDrawerOpen && (
            <AnimatePresence>
              <motion.div
                className='relative h-full'
                style={{ width: drawerWidth }}
                {...drawerContentAnimationConfig}
              >
                <motion.div
                  {...drawerDragResizingConfig}
                  className='absolute left-0 w-[3px] h-full cursor-col-resize hover:bg-sroom-gray-300 active:bg-sroom-gray-500 active:blur-sm'
                />
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
          className='absolute bottom-0 z-50 max-w-full min-w-full shadow-2xl bg-sroom-white shrink-0'
          style={{ height: bottomSheetHeight }}
        >
          {isDrawerOpen && (
            <AnimatePresence>
              <motion.div
                className='relative w-full'
                style={{ height: bottomSheetHeight }}
                {...bottomSheetContentAnimationConfig}
              >
                <motion.div
                  {...bottomSheetDragResizingConfig}
                  className='absolute top-0 z-20 w-full h-[3px] cursor-row-resize hover:bg-sroom-gray-300 active:bg-sroom-gray-500 active:blur-sm'
                />
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
