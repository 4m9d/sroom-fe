'use client';
import {
  AnimatePresence,
  PanInfo,
  motion,
  useAnimationControls,
  useMotionValue
} from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { COURSE_MATERIAL_BREAKPOINT } from '@/src/constants/window/window';
import useWindowSize from '@/src/hooks/useWindowSize';
import CourseMaterialContent from './CourseMaterialContent';

type Props = {
  courseVideoId: number;
  handleTimestampClick: (formattedTimestamp: string) => void;
};

const BOTTOM_SHEET_MAX_HEIGHT = 700;
const BOTTOM_SHEET_RESIZE_MIN = 100;
const DRAWER_MAX_WIDTH = 580;
const DRAWER_RESIZE_MIN = 250;

export default function CourseMaterialDrawer({
  courseVideoId,
  handleTimestampClick
}: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const initialBottomSheetHeight =
    windowHeight * 0.6 < BOTTOM_SHEET_MAX_HEIGHT
      ? windowHeight * 0.6
      : BOTTOM_SHEET_MAX_HEIGHT;
  const initialDrawerWidth =
    windowWidth * 0.3 < DRAWER_MAX_WIDTH ? windowWidth * 0.3 : DRAWER_MAX_WIDTH;

  const bottomSheetHeight = useMotionValue(initialBottomSheetHeight);
  const drawerWidth = useMotionValue(initialDrawerWidth);

  const disableYoutubePlayerMouseEvent = useCallback(() => {
    const youtubePlayer = document.getElementById(
      'youtube-player'
    ) as HTMLDivElement;
    youtubePlayer.classList.add('pointer-events-none');
  }, []);

  const enableYoutubePlayerMouseEvent = useCallback(() => {
    const youtubePlayer = document.getElementById(
      'youtube-player'
    ) as HTMLDivElement;
    youtubePlayer.classList.remove('pointer-events-none');
  }, []);

  const drawerAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.3 },
    variants: {
      initial: { width: 0 },
      animate: { width: windowWidth * 0.3, maxWidth: DRAWER_MAX_WIDTH },
      exit: { width: 0 }
    }
  };
  const drawerContentAnimationConfig = {
    initial: { opacity: 0, translateX: '100%' },
    animate: { opacity: 1, translateX: '0%' },
    exit: { opacity: 0, translateX: '100%' },
    transition: { ease: 'easeInOut', duration: 0.3 }
  };

  const drawerDragResizingConfig = {
    drag: 'x' as 'x',
    dragConstraints: {
      left: 0,
      right: 0
    },
    dragElastic: 0,
    dragMomentum: false,
    onDragStart: () => {
      setIsDragging(true);
    },
    onDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      event.stopPropagation();
      drawerWidth.set(
        resizeRangeHandler(
          windowWidth - info.point.x,
          DRAWER_RESIZE_MIN,
          DRAWER_MAX_WIDTH
        )
      );
    },
    onDragEnd: () => {
      setIsDragging(false);
    }
  };
  const bottomSheetAnimationConfig = {
    animate: controls,
    transition: { ease: 'easeInOut', duration: 0.3 },
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
    transition: { ease: 'easeInOut', duration: 0.3 }
  };

  const bottomSheetDragResizingConfig = {
    drag: 'y' as 'y',
    dragConstraints: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    dragElastic: 0,
    dragMomentum: false,
    onDragStart: () => {
      setIsDragging(true);
    },
    onDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      event.stopPropagation();

      bottomSheetHeight.set(
        resizeRangeHandler(
          windowHeight - info.point.y,
          BOTTOM_SHEET_RESIZE_MIN,
          BOTTOM_SHEET_MAX_HEIGHT
        )
      );
    },
    onDragEnd: () => {
      setIsDragging(false);
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
    const buttonElement = document.getElementById(
      'course-material-drawer'
    ) as HTMLButtonElement;

    if (isDrawerOpen) {
      controls.start('exit');
      setIsDrawerOpen(false);
      buttonElement.classList.add('animate-pulse');
    } else {
      controls.start('animate');
      setIsDrawerOpen(true);
      buttonElement.classList.remove('animate-pulse');
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

  useEffect(() => {
    if (isDragging) {
      disableYoutubePlayerMouseEvent();
    } else {
      enableYoutubePlayerMouseEvent();
    }
  }, [
    enableYoutubePlayerMouseEvent,
    disableYoutubePlayerMouseEvent,
    isDragging
  ]);

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
                  handleTimestampClick={handleTimestampClick}
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
          className='absolute bottom-0 z-50 w-full max-w-full min-w-full shadow-2xl bg-sroom-white shrink-0'
          style={{ height: bottomSheetHeight }}
        >
          {isDrawerOpen && (
            <AnimatePresence>
              <motion.div
                className='relative w-full h-full max-h-full'
                style={{ height: bottomSheetHeight }}
                {...bottomSheetContentAnimationConfig}
              >
                <motion.div
                  {...bottomSheetDragResizingConfig}
                  className='absolute z-20 flex justify-center w-full h-5 cursor-row-resize'
                >
                  <div className='w-40 h-2 mt-2 rounded-full bg-sroom-gray-500 active:bg-sroom-gray-500' />
                </motion.div>
                <CourseMaterialContent
                  courseVideoId={courseVideoId}
                  drawerHandler={drawerHandler}
                  handleTimestampClick={handleTimestampClick}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.aside>
      </AnimatePresence>
    );
  }
}
