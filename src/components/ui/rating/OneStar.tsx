type Props = {
  className?: string;
};

export default function OneStar({ className }: Props) {
  return (
      <input
        className={`${className} bg-orange-500 mb-[0.1rem] mr-[0.1rem] mask mask-star-2 pointer-events-none`}
      />
  );
}
