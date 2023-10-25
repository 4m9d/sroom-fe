import StarRatingWithReviewCount from '../ui/rating/StarRatingWithReviewCount';
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
      <VerticalSmallLectureCard
        src={thumbnail}
        alt={lecture_title}
        isPlaylist={is_playlist}
      >
        <div className='h-full'>
          <div className='mb-2'>
            <p className='text-lg font-bold break-all whitespace-normal line-clamp-1'>
              {lecture_title}
            </p>
          </div>
          <div className='mb-2'>
            <p className='text-sm break-all whitespace-normal text-sroom-black-300 line-clamp-1'>
              {channel}
            </p>
          </div>
          {review_count > 0 && (
            <StarRatingWithReviewCount
              rating={rating}
              review_count={review_count}
            />
          )}
        </div>
      </VerticalSmallLectureCard>
    </div>
  );
}
