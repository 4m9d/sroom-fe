type Props = {
  className?: string;
  value: number;
};

export default function ProgressBar({ className, value }: Props) {
  return (
    <div className={`${className} bg-white`}>
      <div className='h-full bg-orange-500' style={{ width: `${value}%` }}></div>
    </div>
  );
}
