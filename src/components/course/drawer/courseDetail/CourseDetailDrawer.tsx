'use client';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import SectionList from './SectionList';
import CourseDetailHeader from './CourseDetailHeader';
import DrawerMenuButtons from './DrawerMenuButtons';
import ArrowRightSVG from '@/public/icon/ArrowRight';

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
      animate: { width: '40%', maxWidth: '19rem' },
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
        className='relative max-h-full min-h-full shadow-lg bg-sroom-white shrink-0'
      >
        {isDrawerOpen && (
          <div className='flex flex-col justify-between h-full'>
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
          className='absolute flex items-center justify-center w-5 h-12 bg-zinc-900 -right-5 top-[calc(50%-1.5rem)] z-50  hover:scale-105 transition-all hover:opacity-90'
        >
          <span
            className={`w-3 stroke-sroom-white ${isDrawerOpen ? 'rotate-180' : ''} transition-all`}
          >
            <ArrowRightSVG />
          </span>
        </button>
      </motion.aside>
    </AnimatePresence>
  );
}
