import { useCallback, useMemo } from 'react';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';

type Props = {
  time: number;
};

export default function TotalLearningTime({ time }: Props) {
  const timeUnitHandler = useCallback((time: number) => {
    const timeInString = time.toString();
    let result = [];

    if (timeInString.length > 3) {
      result = [Math.floor(time / 60).toString(), '시간'];
    } else {
      result = [timeInString, '분'];
    }

    return result;
  }, []);

  const [timeInString, timeUnit] = useMemo(
    () => timeUnitHandler(convertSecondsToMinutes(time)),
    [time, timeUnitHandler]
  );

  return (
    <div className='flex flex-col justify-between col-start-1 col-end-2 row-start-2 row-end-4 px-[10%] py-[8%] bg-sroom-gray-300 text-sroom-black-400'>
      <p className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'>누적 수강 시간</p>
      <p className='text-lg font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>
        {timeInString}
        <span className='text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>{timeUnit}</span>
      </p>
    </div>
  );
}
