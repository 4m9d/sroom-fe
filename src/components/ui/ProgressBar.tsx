type Props = {
  className?: string;
  value: number;
};

export default function ProgressBar({ className, value }: Props) {
  return (
    <div className={`${className} w-full h-[6px] bg-white`}>
      <div className='h-full bg-orange-500' style={{ width: `${value}%` }}></div>
    </div>
  );
}
