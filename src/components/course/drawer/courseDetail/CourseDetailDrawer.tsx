'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SectionList from './SectionList';
import CourseDetailHeader from './CourseDetailHeader';
import DrawerMenuButtons from './DrawerMenuButtons';

type Props = {
  courseDetail: CourseDetail;
  currentPlayingVideo: LastViewVideo;
  setCurrentPlayingVideo: Dispatch<SetStateAction<LastViewVideo>>;
};

export default function CourseDetailDrawer({
  courseDetail,
  currentPlayingVideo,
  setCurrentPlayingVideo
}: Props) {
  const controls = useAnimationControls();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    course_id,
    thumbnail,
    course_title,
    channels,
    course_duration,
    total_video_count,
    completed_video_count,
    progress,
    current_duration,
    last_view_video,
    sections,
    use_schedule
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

  return (
    <AnimatePresence>
      <motion.aside
        id='course-detail-drawer'
        {...animationConfig}
        className='relative max-h-full min-h-full bg-white shadow-lg shrink-0'
      >
        {isDrawerOpen && (
          <div className='flex flex-col justify-between'>
            <div>
              <CourseDetailHeader
                course_title={course_title}
                channels={channels}
                thumbnail={thumbnail}
                total_video_count={total_video_count}
                course_duration={course_duration}
                current_duration={current_duration}
                progress={progress}
              />
              <SectionList
                sections={sections}
                use_schedule={use_schedule}
                course_title={course_title}
                currentPlayingVideo={currentPlayingVideo}
                setCurrentPlayingVideo={setCurrentPlayingVideo}
              />
            </div>
            <DrawerMenuButtons />
          </div>
        )}
        <button
          id='course-detail-drawer-btn'
          type='button'
          onClick={drawerHandler}
          className='absolute flex items-center justify-center w-5 h-12 bg-zinc-900 -right-5 top-[calc(50%-1.5rem)]'
        >
          <Image
            src='/icon/icon_arrow_right_white.svg'
            alt='사이드 바 버튼'
            width={12}
            height={12}
            className={`${isDrawerOpen ? 'rotate-180' : ''} transition-all`}
          />
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
