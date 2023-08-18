'use client';
import getRelativeTime from '@/src/util/day/getRelativeTime';
import HorizontalSmallLectureCard from '../ui/lectureCard/HorizontalSmallLectureCard';
import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
import ThumbnailBadge from '../ui/badge/ThumbnailBadge';
import getCompactFormattedNumber from '@/src/util/number/getCompactFormattedNumber';

export default async function SearchLectureCard({
  lecture
}: {
  lecture: SearchResultsLecture;
}) {
  const {
    lecture_title,
    description,
    channel,
    review_count,
    rating,
    thumbnail,
    is_playlist,
    is_enrolled,
    lecture_count,
    view_count,
    published_at
  } = lecture;
  // TODO: 플레이리스트 여부, 등록 여부에 따른 UI 구현

  return (
    <HorizontalSmallLectureCard src={thumbnail} alt={lecture_title}>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col gap-1 mt-4 mb-1'>
          <p className='text-base font-bold whitespace-normal line-clamp-1'>
            {lecture_title}
          </p>
          <p className='mb-1 text-sm whitespace-normal text-sroom-black-300 line-clamp-1'>
            {channel}
          </p>
          <p className='text-xs text-sroom-black-100'>
            {is_playlist
              ? `영상 ${lecture_count?.toLocaleString()}개`
              : `조회수 ${getCompactFormattedNumber(view_count)}회`}
            ･{getRelativeTime(published_at)}
          </p>
        </div>
        <div className='mb-1 min-h-[3rem]'>
          <p className='text-sm whitespace-normal text-sroom-black-200 line-clamp-2'>
            {description}
          </p>
        </div>
      </div>
      <div className='absolute right-3 top-3'>
        <StarRatingWithReviewCount
          rating={rating}
          review_count={review_count}
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
    </HorizontalSmallLectureCard>
  );
}
