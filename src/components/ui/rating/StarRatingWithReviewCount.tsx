import OneStar from "./OneStar";

type Props = {
  rating: number;
  review_count: number;
}

export default function StarRatingWithReviewCount({rating, review_count}: Props) {
  return (
    <div className='flex max-w-[6.5rem] h-4'>
      <div className='flex items-center justify-center mr-1'>
        <OneStar className='w-3 h-3' />
        <p className='text-xs font-bold text-orange-500'>{rating}</p>
      </div>
      <p className='text-xs font-bold text-orange-500 underline'>
        후기 {review_count.toLocaleString()}개
      </p>
    </div>
  );
}