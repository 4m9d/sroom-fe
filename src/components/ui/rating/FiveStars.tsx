'use client';
type Props = {
  className?: string;
  isInputEnabled?: boolean;
  ref?: React.MutableRefObject<string>;
  rating?: number;
};

const FilledStar = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} mask mask-star-2 pointer-events-none`} />
  );
};

const UnfilledStar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} mask mask-star-2 pointer-events-none bg-opacity-20`}
    />
  );
};

export default function FiveStars({
  className,
  isInputEnabled = false,
  ref,
  rating
}: Props) {
  const ratingOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rating = event.target.value;
    if (ref) {
      ref.current = rating;
    }
  };

  const checkedHandler = (index: number) => {
    if (ref) {
      return ref.current === index.toString();
    }
    return rating === index;
  };

  if (rating === undefined) {
    return (
      <div className='gap-[1px] rating'>
        {new Array(5).fill(0).map((_, index) => {
          return (
            <input
              onChange={ratingOnChangeHandler}
              key={index}
              type='radio'
              name={`rating-${ref ? ref.current : rating}`}
              value={index + 1}
              className={`${className} mask mask-star-2`}
              checked={checkedHandler(index + 1)}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className='flex items-center'>
        {new Array(rating).fill(0).map((_, index) => {
          return <FilledStar key={'filled_' + index} className={className} />;
        })}
        {new Array(5 - rating).fill(0).map((_, index) => {
          return (
            <UnfilledStar key={'unfilled_' + index} className={className} />
          );
        })}
      </div>
    );
  }
}
