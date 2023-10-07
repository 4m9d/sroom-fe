'use client';
import getRelativeTime from '@/src/util/time/getRelativeTime';
import HorizontalSmallLectureCard from '../ui/lectureCard/HorizontalSmallLectureCard';
import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
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
    <HorizontalSmallLectureCard
      src={thumbnail}
      alt={lecture_title}
      isPlaylist={is_playlist}
      isEnrolled={is_enrolled}
      isMembersOnly={view_count === -1}
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col gap-1 mt-6 mb-1'>
          <p className='text-base font-bold break-all whitespace-normal line-clamp-2'>
            {lecture_title}
          </p>
          <p className='mb-1 text-sm break-all whitespace-normal text-sroom-black-300 line-clamp-1'>
            {channel}
          </p>
          <p className='text-xs text-sroom-black-100'>
            {is_playlist
              ? `영상 ${lecture_count?.toLocaleString()}개`
              : `조회수 ${getCompactFormattedNumber(view_count)}회`}
            ･{getRelativeTime(published_at)}
          </p>
        </div>
      </div>
      <div className='absolute right-3 top-3'>
        {review_count > 0 && (
          <StarRatingWithReviewCount
            rating={rating}
            review_count={review_count}
          />
        )}
      </div>
    </HorizontalSmallLectureCard>
  );
}
