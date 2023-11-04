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
      <div className='flex justify-between max-w-screen-xl gap-5 px-5 mx-auto mt-12 mb-5 h-14 md:h-16 lg:h-20 text-sroom-black-400'>
        <div className='flex flex-col justify-between'>
          <div className='flex items-center gap-3'>
            <motion.h2
              key={title + channel}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              className='text-lg font-bold break-all whitespace-normal md:text-xl lg:text-2xl line-clamp-1'
            >
              {title}
            </motion.h2>
            {is_completed && <VideoCompletionBadge />}
          </div>
          <motion.h3
            key={title + channel}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            transition={{ delay: 0.1 }}
            className='text-sm font-medium break-all whitespace-normal lg:text-base text-sroom-black-300 line-clamp-1'
          >
            {channel}
          </motion.h3>
        </div>
        <div className='flex flex-col justify-end shrink-0'>
          <Button
            id='course-material-drawer'
            className='text-xs md:text-sm px-4 md:!px-8 font-bold text-sroom-white bg-sroom-black-400 animate-pulse'
          >
            {'강의 자료 보기'}
          </Button>
        </div>
      </div>
    </AnimatePresence>
  );
}
