'use client';
import {
  getCurrentWeekRange,
  getNextWeekRange,
  getPreviousWeekRange,
  getFullWeekDate
} from '@/src/util/day/getWeekRange';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import { useCallback, useEffect, useState } from 'react';
import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';
import CalendarForOneWeek from './CalendarForOneWeek';
import LearningHistoryItem from './LearningHistoryItem';
import { weekdayKey } from '.';
import Button from '@/src/components/ui/button/Button';

type Props = {
  learning_histories: LearningHistory[];
};

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

  return (
    <div className='flex flex-col items-center justify-center col-start-3 col-end-4 row-start-1 row-end-4 bg-sroom-gray-300 text-sroom-black-400'>
      <div className='flex items-center justify-center py-2 md:py-4 xl:py-7'>
        <p className='text-xs font-semibold md:text-base xl:text-lg'>
          주간 수강 캘린더
        </p>
      </div>
      <div className='flex justify-between w-full h-full pb-5 overflow-auto md:pb-8 xl:pb-10'>
        <div className='w-5 pt-[3%] sm:pt-[6%] md:pt-[10%] xl:pt-[12%] md:w-8 xl:w-10 shrink-0'>
          <Button
            onClick={previousWeekClickHandler}
            className='flex items-center justify-center w-5 h-5 text-xs font-bold transition-all md:w-8 md:h-8 xl:w-10 xl:h-10 md:text-base xl:text-lg hover:bg-zinc-200'
          >
            〈
          </Button>
        </div>
        <div className='flex flex-col grow bg-sroom-white'>
          <div className='flex items-center justify-center flex-1 border-b border-sroom-gray-400'>
            <CalendarForOneWeek
              selectedDay={selectedDay}
              selectedWeek={selectedWeek}
              dayCardClickHandler={dayCardClickHandler}
            />
          </div>
          <div className='flex flex-col items-center justify-center flex-1 gap-2'>
            {selectedWeek && selectedWeek[selectedDay]?.learningHistory && (
              <>
                <LearningHistoryItem
                  title={'학습 시간'}
                  value={getFormattedHour(
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
            )}
          </div>
        </div>
        <div className='w-5 pt-[3%] sm:pt-[6%] md:pt-[10%] xl:pt-[12%] md:w-8 xl:w-10 shrink-0'>
          {getCurrentWeekRange().startOfWeek !== selectedWeek[0].fullDate && (
            <Button
              onClick={nextWeekClickHandler}
              className='flex items-center justify-center w-5 h-5 text-xs font-bold transition-all md:w-8 md:h-8 xl:w-10 xl:h-10 md:text-base xl:text-lg hover:bg-zinc-200'
            >
              〉
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
