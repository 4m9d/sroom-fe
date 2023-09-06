'use client';
import getCompactFormattedDate from '@/src/util/day/getCompactFormattedDate';
import HorizontalBigLectureCard from '../ui/lectureCard/HorizontalBigLectureCard';
import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
import ThumbnailBadge from '../ui/badge/ThumbnailBadge';
import getCompactFormattedNumber from '@/src/util/number/getCompactFormattedNumber';
import LectureEnrollmentButton from '../lectureEnrollment/LectureEnrollmentButton';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  lectureDetail: LectureDetail;
  isIndexListFetched: boolean;
  onClose: () => void;
};

export default function LectureDetailCard({
  lectureDetail,
  isIndexListFetched,
  onClose
}: Props) {
  const {
    lecture_code,
    lecture_title,
    published_at,
    view_count,
    thumbnail,
    channel,
    description,
    rating,
    review_count,
    courses,
    is_playlist,
    is_enrolled
  } = lectureDetail;

  return (
    <HorizontalBigLectureCard src={thumbnail} alt={lecture_title}>
      <AnimatePresence>
        <div className='w-full'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col justify-start h-[calc(100%-3rem)] gap-2 mb-2'>
              <div className='flex flex-col gap-1 mt-4 md:mb-1 lg:mb-2'>
                <motion.h2
                  initial={{ y: '10%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className='text-lg font-bold whitespace-normal md:text-xl line-clamp-3 lg:line-clamp-1 xl:line-clamp-2'
                >
                  {lecture_title}
                </motion.h2>
                <motion.p
                  initial={{ y: '10%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className='text-sm font-medium whitespace-normal md:text-base text-sroom-black-300 line-clamp-1'
                >
                  {channel}
                </motion.p>
                <p className='flex text-xs text-sroom-black-100'>
                  {is_playlist === false && (
                    <span>
                      {view_count &&
                        `조회수 ${getCompactFormattedNumber(view_count)}회`}
                    </span>
                  )}
                  <span className='ml-2'>
                    {getCompactFormattedDate(published_at)}
                  </span>
                </p>
              </div>
              <div className='h-full whitespace-pre-wrap'>
                <p className='text-xs md:text-sm text-sroom-black-200 line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5'>
                  {description}
                </p>
              </div>
              <div className='lg:absolute lg:right-3 lg:top-3'>
                <StarRatingWithReviewCount
                  rating={rating}
                  review_count={review_count}
                />
              </div>
            </div>
            <LectureEnrollmentButton
              disabled={isIndexListFetched}
              onEnrollSuccess={onClose}
              is_playlist={is_playlist}
              courses={courses}
              lecture_code={lecture_code}
            />
          </div>
          {is_enrolled && (
            <div className='absolute top-3 left-3'>
              <ThumbnailBadge title='수강 중' className='bg-sroom-black-400' />
            </div>
          )}
          {is_playlist && (
            <div
              className={`absolute top-3 ${
                is_enrolled ? 'left-[4.7rem]' : 'left-3'
              }`}
            >
              <ThumbnailBadge title='재생목록' className='bg-sroom-brand' />
            </div>
          )}
        </div>
      </AnimatePresence>
    </HorizontalBigLectureCard>
  );
}
