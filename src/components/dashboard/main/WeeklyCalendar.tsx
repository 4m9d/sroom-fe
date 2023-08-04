'use client';
import {
  getCurrentWeekRange,
  getNextWeekRange,
  getPreviousWeekRange,
  getFullWeekDate
} from '@/src/util/day/getWeekRange';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import { useCallback, useEffect, useState } from 'react';
import getTimeInMinute from '@/src/util/day/getTimeInMinute';

type Props = {
  learning_histories: LearningHistory[];
};

const weekdayList = {
  '0': 'S',
  '1': 'M',
  '2': 'T',
  '3': 'W',
  '4': 'T',
  '5': 'F',
  '6': 'S',
  '7': 'NONE'
} as const;

type weekdayKey = keyof typeof weekdayList;

export default function WeeklyCalendar({ learning_histories }: Props) {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo[]>(
    getFullWeekDate()
  );
  const [selectedDay, setSelectedDay] = useState<weekdayKey>('7');

  const findLearningHistory = useCallback((startOfWeek: string) => {
    const weekInfo = getFullWeekDate(startOfWeek);

    const mappedWeekInfo: WeekInfo[] = weekInfo.map((day) => {
      const learningHistory = learning_histories.find((history) => {
        if (history.date === day.fullDate) {
          return true;
        }
      });
      const result: WeekInfo = { ...day, learningHistory };

      return result;
    });
    return mappedWeekInfo;
  }, []);

  const dayCardClickHandler = useCallback((weekday: weekdayKey) => {
    setSelectedDay(weekday);
  }, []);

  const previousWeekClickHandler = useCallback(() => {
    const startOfWeek = selectedWeek[0].fullDate;
    const endOfWeek = selectedWeek[6].fullDate;

    const previousWeek = getPreviousWeekRange({ startOfWeek, endOfWeek });
    setSelectedWeek(findLearningHistory(previousWeek.startOfWeek));
    setSelectedDay('7');
  }, [selectedWeek]);

  const nextWeekClickHandler = useCallback(() => {
    const startOfWeek = selectedWeek[0].fullDate;
    const endOfWeek = selectedWeek[6].fullDate;

    const nextWeek = getNextWeekRange({ startOfWeek, endOfWeek });
    setSelectedWeek(findLearningHistory(nextWeek.startOfWeek));
    setSelectedDay('7');
  }, [selectedWeek]);

  useEffect(() => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();
    setSelectedWeek(findLearningHistory(startOfWeek));
  }, []);

  const DayCard = ({
    weekday,
    date,
    hasValue
  }: {
    weekday: weekdayKey;
    date: string;
    hasValue: boolean;
  }) => {
    return (
      <div
        onClick={() => dayCardClickHandler(weekday)}
        className={`flex flex-col justify-center px-2 py-1 cursor-pointer ${
          selectedDay === weekday ? 'bg-orange-500 text-white' : 'text-black'
        }}`}
      >
        <div className='flex items-center justify-center flex-1'>
          <p className='font-bold'>{weekdayList[weekday]}</p>
        </div>
        <div className='items-center justify-center flex-1'>
          {date === 'Invalid Date' ? '' : date}
        </div>
        <div className='flex items-center justify-center flex-1'>
          {hasValue ? (
            <div
              className={`w-2 h-2 ${
                selectedDay === weekday ? 'bg-white' : 'bg-orange-500'
              } rounded-full`}
            />
          ) : (
            <div className='w-2 h-2 rounded-full bg-inherit' />
          )}
        </div>
      </div>
    );
  };

  const CalendarForOneWeek = () => {
    return (
      <div className='relative flex w-full justify-evenly h-3/5'>
        {selectedWeek?.map((day, index) => {
          return (
            <DayCard
              key={day.fullDate + index}
              weekday={index.toString() as weekdayKey}
              date={day.date}
              hasValue={day.learningHistory !== undefined}
            />
          );
        })}
        <button
          type='button'
          onClick={previousWeekClickHandler}
          className='absolute flex items-center justify-center w-10 h-10 font-bold transition-all hover:bg-zinc-200 -left-14 top-5'
        >
          〈
        </button>
        {getCurrentWeekRange().startOfWeek !== selectedWeek[0].fullDate && (
          <button
            type='button'
            onClick={nextWeekClickHandler}
            className='absolute flex items-center justify-center w-10 h-10 font-bold transition-all hover:bg-zinc-200 -right-14 top-5'
          >
            〉
          </button>
        )}
      </div>
    );
  };

  const LearningHistoryItem = ({
    title,
    value
  }: {
    title: string;
    value: string;
  }) => {
    return (
      <div className='flex items-center justify-center w-full'>
        <p className='w-1/4 text-xs font-bold text-left'>{title}</p>
        <p className='w-1/4 text-xs text-left'>{value}</p>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center col-start-3 col-end-4 row-start-1 row-end-4 gap-5 py-5 bg-zinc-100'>
      <p className='text-sm'>주간 수강 캘린더</p>
      <div className='flex flex-col w-3/4 h-full bg-white'>
        <div className='flex items-center justify-center flex-1 border-b-2 border-zinc-50'>
          <CalendarForOneWeek />
        </div>
        <div className='flex flex-col items-center justify-center flex-1 gap-2'>
          {selectedWeek && selectedWeek[selectedDay]?.learningHistory && (
            <>
              <LearningHistoryItem
                title={'학습 시간'}
                value={getFormattedHour(
                  getTimeInMinute(
                    selectedWeek[selectedDay].learningHistory?.learning_time ??
                      0
                  )
                )}
              />
              <LearningHistoryItem
                title={'푼 퀴즈'}
                value={`${selectedWeek[selectedDay].learningHistory?.quiz_count}문제`}
              />
              <LearningHistoryItem
                title={'수강한 강의'}
                value={`${selectedWeek[selectedDay].learningHistory?.lecture_count}개`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
