type Props = {
  className?: string;
};

export default function OneStar({ className }: Props) {
  return (
      <div
        className={`${className} bg-sroom-brand mb-[0.1rem] mr-[0.1rem] mask mask-star-2 pointer-events-none`}
      />
  );
}
