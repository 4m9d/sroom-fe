'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/button/Button';
import VideoCompletionBadge from '../ui/badge/VideoCompletionBadge';

type Props = {
  title: string;
  channel: string;
  is_completed: boolean;
};

export default function CourseHeader({ title, channel, is_completed }: Props) {
  return (
    <AnimatePresence>
      <div className='flex justify-between max-w-screen-lg gap-5 px-5 mx-auto mt-12 mb-5 h-14 md:h-16 lg:h-20 text-sroom-black-400'>
        <div className='flex flex-col justify-between'>
          <div className='flex items-center gap-3'>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              className='text-xl font-bold whitespace-normal md:text-2xl lg:text-3xl line-clamp-1'
            >
              {title}
            </motion.h2>
            {is_completed && <VideoCompletionBadge />}
          </div>
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ delay: 0.1 }}
            className='text-sm font-medium whitespace-normal lg:text-base text-sroom-black-300 line-clamp-1'
          >
            {channel}
          </motion.h3>
        </div>
        <div className='flex flex-col justify-end shrink-0'>
          <Button
            id='course-material-drawer'
            className='text-xs lg:text-sm lg:!px-10 font-bold text-sroom-white bg-sroom-black-400'
          >
            {'강의 노트 / 퀴즈 보기'}
          </Button>
        </div>
      </div>
    </AnimatePresence>
  );
}
