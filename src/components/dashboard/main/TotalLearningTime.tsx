import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';
import { useCallback, useMemo } from 'react';

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
    <div className='flex flex-col justify-between col-start-1 col-end-2 row-start-2 row-end-4 px-5 py-5 bg-zinc-100'>
      <p className='text-sm'>누적 수강 시간</p>
      <p className='font-bold text-7xl'>
        {timeInString}
        <span className='text-lg font-semibold'>{timeUnit}</span>
      </p>
    </div>
  );
}
