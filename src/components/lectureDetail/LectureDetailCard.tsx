import getCompactFormattedDate from '@/src/util/day/getCompactFormattedDate';
import HorizontalBigLectureCard from '../ui/lectureCard/HorizontalBigLectureCard';
import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
import ThumbnailBadge from '../ui/ThumbnailBadge';
import getCompactFormattedNumber from '@/src/util/number/getCompactFormattedNumber';
import LectureEnrollmentButton from '../lectureEnrollment/LectureEnrollmentButton';

type Props = {
  lectureDetail: LectureDetail;
};

export default function LectureDetailCard({ lectureDetail }: Props) {
  const {
    lecture_code,
    lecture_title,
    published_at,
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
          <p className='text-xs text-zinc-500'>
            {is_playlist
              ? `영상 ${lecture_count?.toLocaleString()}개`
              : `조회수 ${getCompactFormattedNumber(view_count)}회`}
            ･{getCompactFormattedDate(published_at)}
          </p>
        </div>
        <div className='h-full whitespace-pre-wrap'>
          <p className='text-sm text-zinc-500 line-clamp-2 xl:line-clamp-5'>
            {description}
          </p>
        </div>
      </div>
      <LectureEnrollmentButton is_enrolled={is_enrolled} is_playlist={is_playlist} courses={courses}/>
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
