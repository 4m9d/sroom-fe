import StarRatingWithReviewCount from '../ui/StarRatingWithReviewCount';
import VerticalSmallLectureCard from '../ui/lectureCard/VerticalSmallLectureCard';

type Props = {
  lecture: PersonalizedLecture;
};

export default function LectureRecommendationsCard({ lecture }: Props) {
  return (
    <VerticalSmallLectureCard
      src={lecture.thumbnail}
      alt={lecture.lecture_title}
    >
      <div className='h-full'>
        <div className='mb-1'>
          <p className='text-lg font-bold whitespace-normal line-clamp-1'>
            {lecture.lecture_title}
          </p>
        </div>
        <div className='mb-1'>
          <p className='text-sm font-semibold whitespace-normal text-zinc-700 line-clamp-1'>
            {lecture.channel}
          </p>
        </div>
        <div className='mb-1 min-h-[3.5rem]'>
          <p className='text-sm whitespace-normal text-zinc-500 line-clamp-3'>
            {lecture.description}
          </p>
        </div>
        <StarRatingWithReviewCount
          rating={lecture.rating}
          review_count={lecture.review_count}
        />
      </div>
    </VerticalSmallLectureCard>
  );
}
