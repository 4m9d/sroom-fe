import getCompactDateFormat from '@/src/util/day/getCompactFormattedDate';
import ReviewableLectureCard from './ReviewableLectureCard';
import FiveStars from '@/src/components/ui/rating/FiveStars';

type Props = { reviewableLecture: ReviewableLecture };

export default function ReviewDoneLectureCard({ reviewableLecture }: Props) {
  return (
    <div className='flex flex-col items-center justify-start w-full border border-sroom-gray-400'>
      <ReviewableLectureCard
        reviewableLecture={reviewableLecture}
        mode='done'
      />
      <div className='w-full h-5 p-3'>
        <FiveStars rating={reviewableLecture.rating} className='w-5 h-5 bg-sroom-brand' />
      </div>
      <div className='w-full p-3 text-sm whitespace-pre-wrap text-sroom-black-200'>
        <p className='overflow-auto'>{reviewableLecture.content}</p>
        <p className='mt-3 text-xs text-right'>
          {getCompactDateFormat(reviewableLecture.submitted_at)}
        </p>
      </div>
    </div>
  );
}
