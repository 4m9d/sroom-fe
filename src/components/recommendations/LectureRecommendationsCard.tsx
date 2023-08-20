import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
import ThumbnailBadge from '../ui/badge/ThumbnailBadge';
import VerticalSmallLectureCard from '../ui/lectureCard/VerticalSmallLectureCard';

type Props = {
  lecture: PersonalizedLecture;
};

export default function LectureRecommendationsCard({ lecture }: Props) {
  const {
    lecture_title,
    channel,
    description,
    rating,
    review_count,
    thumbnail,
    is_playlist
  } = lecture;

  return (
    <div className='transition-all hover:-translate-y-2 hover:cursor-pointer text-sroom-black-400'>
      <VerticalSmallLectureCard src={thumbnail} alt={lecture_title}>
        <div className='h-full'>
          <div className='mb-2'>
            <p className='text-lg font-bold whitespace-normal line-clamp-1'>
              {lecture_title}
            </p>
          </div>
          <div className='mb-2'>
            <p className='text-sm whitespace-normal text-sroom-black-300 line-clamp-1'>
              {channel}
            </p>
          </div>
          <div className='mb-2 min-h-[3.5rem]'>
            <p className='text-sm whitespace-normal text-sroom-black-200 line-clamp-3'>
              {description}
            </p>
          </div>
          <StarRatingWithReviewCount
            rating={rating}
            review_count={review_count}
          />
        </div>
        {is_playlist && (
          <div className='absolute top-0 left-0'>
            <ThumbnailBadge title='재생목록' className='bg-sroom-brand' />
          </div>
        )}
      </VerticalSmallLectureCard>
    </div>
  );
}
