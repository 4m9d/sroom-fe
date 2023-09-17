import getCompactDateFormat from '@/src/util/day/getCompactFormattedDate';
import ReviewableLectureCard from './ReviewableLectureCard';

type Props = { reviewableLecture: ReviewableLecture };

export default function ReviewDoneLectureCard({ reviewableLecture }: Props) {
  return (
    <div className='flex flex-col items-center justify-start w-full border border-sroom-gray-400'>
      <ReviewableLectureCard
        reviewableLecture={reviewableLecture}
        mode='done'
      />
      <div className='w-full p-3 text-sm whitespace-pre-wrap text-sroom-black-200'>
        <p className='overflow-auto'>{reviewableLecture.content}</p>
        <p className='mt-3 text-xs text-right'>
          {getCompactDateFormat(reviewableLecture.submitted_at)}
        </p>
      </div>
    </div>
  );
}