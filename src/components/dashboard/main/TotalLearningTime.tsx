type Props = {
  time: number;
}

export default function TotalLearningTime({time}: Props) {
  return (
    <div className='flex flex-col justify-between col-start-1 col-end-2 row-start-2 row-end-4 px-5 py-5 bg-zinc-100'>
      <p className='text-sm'>누적 수강 시간</p>
      <p className='text-xl'>
        <span className='font-bold text-7xl'>{time}</span>시간
      </p>
    </div>
  );
}