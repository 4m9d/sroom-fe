'use client';
import {
  getCurrentWeekRange,
  getNextWeekRange,
  getPreviousWeekRange,
  getFullWeekDate,
  getMonth
} from '@/src/util/day/getWeekRange';
import { getCurrentWeekDay } from '@/src/util/day/getCurrentDate';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import { useCallback, useLayoutEffect, useState } from 'react';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import CalendarForOneWeek from './CalendarForOneWeek';
import LearningHistoryItem from './LearningHistoryItem';
import { weekdayKey } from '.';

type Props = {
  learning_histories: LearningHistory[];
};

export default function WeeklyCalendar({ learning_histories }: Props) {
  const [selectedWeek, setSelectedWeek] = useState<WeekInfo[]>(
    getFullWeekDate()
  );
  const [selectedDay, setSelectedDay] = useState<weekdayKey>(
    getCurrentWeekDay().toString() as weekdayKey
  );
  const selectedMonth = getMonth(selectedWeek[0].fullDate);

  const findLearningHistory = useCallback(
    (startOfWeek: string) => {
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
    },
    [learning_histories]
  );

  const dayCardClickHandler = useCallback((weekday: weekdayKey) => {
    setSelectedDay(() => weekday);
  }, []);

  const previousWeekClickHandler = useCallback(() => {
    const startOfWeek = selectedWeek[0].fullDate;
    const endOfWeek = selectedWeek[6].fullDate;

    const previousWeek = getPreviousWeekRange({ startOfWeek, endOfWeek });
    setSelectedWeek(findLearningHistory(previousWeek.startOfWeek));
    setSelectedDay(() => '7');
  }, [selectedWeek, findLearningHistory]);

  const nextWeekClickHandler = useCallback(() => {
    const startOfWeek = selectedWeek[0].fullDate;
    const endOfWeek = selectedWeek[6].fullDate;

    const nextWeek = getNextWeekRange({ startOfWeek, endOfWeek });
    setSelectedWeek(findLearningHistory(nextWeek.startOfWeek));
    setSelectedDay(() => '7');
  }, [selectedWeek, findLearningHistory]);

  useLayoutEffect(() => {
    const { startOfWeek } = getCurrentWeekRange();
    setSelectedWeek(findLearningHistory(startOfWeek));
  }, [findLearningHistory]);

  return (
    <div className='flex flex-col items-center justify-center col-start-3 col-end-4 row-start-1 row-end-4 bg-sroom-gray-300 text-sroom-black-400'>
      <div className='flex items-center justify-center py-2 sm:py-3 md:py-4 xl:py-7'>
        <p className='text-xs font-semibold md:text-base xl:text-lg'>
          <span className='px-2 py-[2px] mr-1 font-bold bg-sroom-white rounded-sm text-sroom-black-300'>
            {selectedMonth === 'Invalid Date' ? '' : selectedMonth}
          </span>
          월 주간 수강 캘린더
        </p>
      </div>
      <div className='flex justify-between w-full h-full pb-5 overflow-auto md:pb-8 xl:pb-10'>
        <div className='w-[12%] pt-[12%] flex justify-center shrink-0'>
          <button
            type='button'
            onClick={previousWeekClickHandler}
            className='flex items-center justify-center w-4 h-4 text-xs font-bold transition-all md:w-8 md:h-8 xl:w-10 xl:h-10 md:text-base xl:text-lg hover:opacity-80 hover:bg-sroom-gray-500'
          >
            〈
          </button>
        </div>
        <div className='flex flex-col px-2 grow bg-sroom-white'>
          <div className='flex items-center justify-center flex-1 border-b border-sroom-gray-400'>
            <CalendarForOneWeek
              selectedDay={selectedDay}
              selectedWeek={selectedWeek}
              dayCardClickHandler={dayCardClickHandler}
            />
          </div>
          <div className='flex flex-col items-center justify-center flex-1 sm:gap-1 md:gap-2'>
            {selectedWeek && selectedWeek[selectedDay]?.learningHistory ? (
              <>
                <LearningHistoryItem
                  title={'학습 시간'}
                  value={getFormattedTime(
                    convertSecondsToMinutes(
                      selectedWeek[selectedDay].learningHistory
                        ?.learning_time ?? 0
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
            ) : (
              <p className='text-xs font-medium break-keep md:text-sm lg:text-base xl:text-lg text-sroom-black-200'>
                수강 이력이 없어요
              </p>
            )}
          </div>
        </div>
        <div className='w-[12%] pt-[12%] flex justify-center shrink-0'>
          {getCurrentWeekRange().startOfWeek !== selectedWeek[0].fullDate && (
            <button
              type='button'
              onClick={nextWeekClickHandler}
              className='flex items-center justify-center w-4 h-4 text-xs font-bold transition-all md:w-8 md:h-8 xl:w-10 xl:h-10 md:text-base xl:text-lg hover:opacity-80 hover:bg-sroom-gray-500'
            >
              〉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
