'use client';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import ProgressBar from '../../ui/ProgressBar';

type Props = {
  courseDetail: CourseDetail;
};

export default function CourseDetailDrawer({ courseDetail }: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    thumbnail,
    course_title,
    channels,
    course_duration,
    total_video_count,
    progress,
    current_duration
  } = courseDetail;
  const animationConfig = {
    animate: controls,
    variants: {
      initial: { width: 0 },
      animate: { width: '19rem' },
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
        {isDrawerOpen && (
          <section className='flex flex-col gap-3 px-5 pt-5 after:w-full after:h-[1px] after:bg-zinc-200 after:my-[30px]'>
            <div className='relative w-full h-[9.3rem] px-5'>
              <Image
                fill={true}
                sizes='100%'
                src={thumbnail}
                alt={course_title}
              />
            </div>
            <h2 className='text-lg font-bold'>{course_title}</h2>
            <h3 className='text-sm font-normal whitespace-normal text-zinc-500 line-clamp-1'>
              {channels}
            </h3>
            <h4 className='flex text-sm font-normal text-zinc-400'>
              <span className='after:w-[1px] after:h-[10px] after:bg-zinc-400 after:mx-2 after:inline-block after:text-center after:align-middle'>
                {`총 재생 시간 : ${getFormattedHour(course_duration)}`}
              </span>
              <span>{`영상 ${total_video_count}개`}</span>
            </h4>
            <ProgressBar value={progress} className='bg-zinc-100' />
            <h5 className='text-xs font-normal text-zinc-400'>
              {`수강 시간 : ${getFormattedHour(
                current_duration
              )} (진도율 : ${progress}%)`}
            </h5>
          </section>
        )}
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
