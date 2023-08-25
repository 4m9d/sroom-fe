'use client';

import getCompactDateFormat from '@/src/util/day/getCompactFormattedDate';
import FiveStars from '../../ui/rating/FiveStars';

type Props = {
  lectureReview: LectureReview;
};

export default function LectureDetailReviewCard({ lectureReview }: Props) {
  const {
    index,
    published_at,
    review_content,
    reviewer_name,
    submitted_rating
  } = lectureReview;
  return (
    <li className='px-4 py-5 overflow-hidden border border-sroom-gray-500 min-h-[5rem] transition-all'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex'>
          <FiveStars
            className='w-3 h-3 bg-sroom-black-400'
            rating={submitted_rating}
          />
          <span className='ml-2 text-sm text-sroom-black-300'>{reviewer_name}</span>
        </div>
        <div className='text-xs text-sroom-black-100'>
          {getCompactDateFormat(published_at)}
        </div>
      </div>
      <div className='whitespace-pre-wrap'>
        <p className='overflow-auto text-sm text-sroom-black-200'>
          {review_content}
        </p>
      </div>
    </li>
  );
}
