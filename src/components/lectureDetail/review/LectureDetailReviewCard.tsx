'use client';

import getCompactDateFormat from "@/src/util/day/getCompactFormattedDate";
import FiveStars from "../../ui/rating/FiveStars";

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
    <li className='p-3 border border-gray-200 min-h-16'>
      <div className='flex justify-between mb-5'>
        <div>
          <FiveStars
            className='w-3 h-3 bg-zinc-800'
            rating={submitted_rating}
          />
          <span className='ml-2 text-sm'>{reviewer_name}</span>
        </div>
        <div className='text-sm text-zinc-500'>
          {getCompactDateFormat(published_at)}
        </div>
      </div>
      <div className='whitespace-pre-wrap'>
        <p className='overflow-auto text-sm text-zinc-500'>{review_content}</p>
      </div>
    </li>
  );
}
