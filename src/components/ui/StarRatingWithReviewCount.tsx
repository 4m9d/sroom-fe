type Props = {
  rating: number;
  review_count: number;
}

export default function StarRatingWithReviewCount({rating, review_count}: Props) {
  return (
    <div className='flex w-24'>
      <p className='mr-1 text-xs font-bold text-orange-500'>
        ★ {rating}
      </p>
      <p className='text-xs font-bold text-orange-500 underline'>
        후기 {review_count}개
      </p>
    </div>
  );
}