import getCompactFormattedDate from '@/src/util/day/getCompactFormattedDate';
import HorizontalBigLectureCard from '../ui/lectureCard/HorizontalBigLectureCard';
import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
import ThumbnailBadge from '../ui/badge/ThumbnailBadge';
import getCompactFormattedNumber from '@/src/util/number/getCompactFormattedNumber';
import LectureEnrollmentButton from '../lectureEnrollment/LectureEnrollmentButton';
import Image from 'next/image';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';

type Props = {
  lectureDetail: LectureDetail;
  onClose: () => void;
};

export default function LectureDetailCard({ lectureDetail, onClose }: Props) {
  const {
    lecture_code,
    lecture_title,
    published_at,
    duration,
    view_count,
    lecture_count,
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
      <div className='flex flex-col justify-start h-[calc(100%-3rem)]'>
        <div className='flex flex-col gap-1 mt-4 md:mb-1 lg:mb-2'>
          <h2 className='text-base font-bold whitespace-normal line-clamp-1 xl:line-clamp-2'>
            {lecture_title}
          </h2>
          <p className='text-sm font-semibold whitespace-normal text-zinc-500 line-clamp-1'>
            {channel}
          </p>
          <p className='flex text-xs text-zinc-500'>
            <Image
              className='w-auto h-auto mr-1'
              src={'/icon/icon_time.svg'}
              alt='총 재생 시간'
              width={12}
              height={12}
            />
            {getFormattedHour(convertSecondsToMinutes(duration))}
            {is_playlist ? (
              <>
                <Image
                  className='w-auto h-auto ml-2 mr-1'
                  src={'/icon/icon_lecture.svg'}
                  alt='수강한 영상'
                  width={12}
                  height={12}
                />
                {`${lecture_count?.toLocaleString()}개`}
              </>
            ) : (
              <span className='ml-2'>
                {`조회수 ${getCompactFormattedNumber(view_count)}회`}
              </span>
            )}
            <span className='ml-2'>
              {getCompactFormattedDate(published_at)}
            </span>
          </p>
        </div>
        <div className='h-full whitespace-pre-wrap'>
          <p className='text-sm text-zinc-500 line-clamp-2 xl:line-clamp-5'>
            {description}
          </p>
        </div>
      </div>
      <LectureEnrollmentButton
        onEnrollSuccess={onClose}
        is_playlist={is_playlist}
        courses={courses}
        lecture_code={lecture_code}
      />
      <div className='absolute right-3 top-3'>
        <StarRatingWithReviewCount
          rating={rating}
          review_count={review_count}
        />
      </div>
      {is_enrolled && (
        <div className='absolute top-3 left-3'>
          <ThumbnailBadge title='수강 중' className='bg-zinc-800' />
        </div>
      )}
      {is_playlist && (
        <div
          className={`absolute top-3 ${
            is_enrolled ? 'left-[4.7rem]' : 'left-3'
          }`}
        >
          <ThumbnailBadge title='재생목록' className='bg-orange-500' />
        </div>
      )}
    </HorizontalBigLectureCard>
  );
}
