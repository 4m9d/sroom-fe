import compareIsFutureDate from '@/src/util/day/compareIsFutureDate';
import { weekdayKey, weekdayList } from '.';

export default function DayCard({
  selectedDay,
  weekday,
  date,
  fullDate,
  hasValue,
  dayCardClickHandler
}: {
  selectedDay: weekdayKey;
  weekday: weekdayKey;
  date: string;
  fullDate: string;
  hasValue: boolean;
  dayCardClickHandler: (weekday: weekdayKey) => void;
}) {
  const disabled = compareIsFutureDate(fullDate);

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={() => dayCardClickHandler(weekday)}
      className={`flex flex-1 flex-col justify-center items-center sm:gap-1 py-1 sm:py-2 lg:py-3 w-[100%/7]
      hover:bg-sroom-gray-200 transition-all
      ${disabled === false ? 'cursor-pointer' : '!bg-sroom-white'}
      ${selectedDay === weekday ? '!bg-sroom-brand' : ''}`}
    >
      <div className='flex items-center justify-center'>
        <p className='text-[0.5rem] sm:text-xs font-semibold lg:text-sm xl:text-lg'>
          {weekdayList[weekday]}
        </p>
      </div>
      <div className='items-center justify-center'>
        <p
          className={`text-[0.5rem] sm:text-xs font-semibold lg:text-sm xl:text-lg ${
            selectedDay === weekday
              ? 'text-sroom-white'
              : disabled
              ? 'text-sroom-black-100'
              : 'text-sroom-black-400'
          }`}
        >
          {date === 'Invalid Date' ? '' : date}
        </p>
      </div>
      <div className='flex items-center justify-center'>
        {hasValue ? (
          <div
            className={`w-2 h-2 ${
              selectedDay === weekday ? 'bg-sroom-white' : 'bg-sroom-brand'
            } rounded-full`}
          />
        ) : (
          <div className='w-2 h-2 rounded-full bg-inherit' />
        )}
      </div>
    </button>
  );
}
