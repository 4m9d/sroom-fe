'use client';
type Props = {
  className?: string;
  isInputEnabled?: boolean;
  ref?: React.MutableRefObject<string>;
  rating?: number;
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
  }

  return (
    <div
      className={`rating ${
        isInputEnabled === false && 'pointer-events-none'
      }`}
    >
      {new Array(5).fill(0).map((_, index) => {
        return (
          <input
            onChange={ratingOnChangeHandler}
            key={index}
            type='radio'
            name={`rating-${ref ? ref.current : rating}`}
            value={index + 1}
            className={`${className} bg-orange-500 mask mask-star-2`}
            checked={checkedHandler(index + 1)}
          />
        );
      })}
    </div>
  );
}
