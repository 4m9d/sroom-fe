'use client';

import { useState } from 'react';

type Props = {
  className?: string;
  onChange?: (input: number) => void;
  rating: number;
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

export default function FiveStars({ className, onChange, rating }: Props) {
  const ratingOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rating = event.target.value;
    onChange && onChange(parseInt(rating));
  };

  if (onChange) {
    return (
      <div className='gap-[1px] rating'>
        {new Array(6).fill(0).map((_, index) => {
          return (
            <input
              onChange={ratingOnChangeHandler}
              key={index}
              type='radio'
              name='review-rating'
              value={index}
              className={`${className} ${
                index === 0 ? 'hidden' : ''
              } mask mask-star-2`}
              checked={index === rating}
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
