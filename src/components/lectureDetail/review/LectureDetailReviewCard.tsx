'use client';
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
    <li className='flex flex-col items-start justify-center py-10 border-b-2 border-solid min-h-16 bg-base-100'>
      <div className='flex mb-5'>
        <div>{submitted_rating}</div>
        <span className='mr-1'>{reviewer_name}</span>
        <div>
          <span className='mr-1'>{published_at}</span>
        </div>
      </div>
      <div className='flex'>
        <p>{review_content}</p>
      </div>
    </li>
  );
}
