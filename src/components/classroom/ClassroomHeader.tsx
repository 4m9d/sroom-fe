type Props = {
  unfinished_course: number;
  completion_rate: number;
};

export default function ClassroomHeader({
  unfinished_course,
  completion_rate
}: Props) {
  return (
    <div className='flex items-center justify-end mb-7'>
      <div className='flex gap-1 font-bold'>
        <p className='text-base md:text-lg lg:text-xl'>
          완강률
          <span className='pl-1 text-xl md:text-3xl lg:text-4xl'>
            {completion_rate}
          </span>
          %,
        </p>
        <p className='text-base md:text-lg lg:text-xl'>
          미수강 강의
          <span className='pl-1 text-xl md:text-3xl lg:text-4xl'>
            {unfinished_course}
          </span>
          개
        </p>
      </div>
    </div>
  );
}
