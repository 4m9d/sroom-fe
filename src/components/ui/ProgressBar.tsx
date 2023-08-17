type Props = {
  className?: string;
  value: number;
};

export default function ProgressBar({ className, value }: Props) {
  return (
    <div className={`${className} w-full h-[6px] bg-sroom-white`}>
      <div className='h-full bg-sroom-brand' style={{ width: `${value}%` }}></div>
    </div>
  );
}
