'use client';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';
import SchedulingSlider from '../scheduling/SchedulingSlider';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { ModalIDs } from '@/src/constants/modal/modal';
import { useEffect, useState } from 'react';
import getFormattedHour from '@/src/util/day/getFormattedHour';
import convertSecondsToMinutes from '@/src/util/day/convertSecondsToMinutes';
import {
  FOUR_HOURS_IN_MINUTES,
  THIRTY_MINUTES
} from '@/src/constants/scheduling/scheduling';
import getCurrentDate from '@/src/util/day/getCurrentDate';
import convertMinutesToSeconds from '@/src/util/day/convertMinutesToSeconds';

type Props = {
  lectureDetail: LectureDetail;
  onClose: () => void;
};

export default function SchedulingModal({ lectureDetail, onClose }: Props) {
  const { lecture_title, duration, indexes } = lectureDetail;
  const durationInMinutes = convertSecondsToMinutes(duration);
  const convertedDuration =
    Math.floor(durationInMinutes / THIRTY_MINUTES) * THIRTY_MINUTES;
  const sliderMaxValue = Math.max(
    Math.min(FOUR_HOURS_IN_MINUTES, convertedDuration),
    THIRTY_MINUTES
  );
  const DEFAULT_CONTENT = 'flex items-center gap-1 h-8 text-lg';
  const MUTABLE_CONTENT =
    'align-middle px-3 py-1 font-semibold bg-white border border-zinc-200  whitespace-normal line-clamp-1';
  const controls = useAnimationControls();
  const animationConfig = {
    animate: controls,
    variants: {
      initial: { opacity: 0, y: '10%' },
      animate: { opacity: 1, y: '0%' }
    },
    transition: { duration: 0.4 }
  };

  const [inputValue, setInputValue] = useState<number>(THIRTY_MINUTES);
  const [scheduling, setScheduling] = useState<number[]>([]);
  const weeklyStudyTime = Math.floor(durationInMinutes / scheduling.length);
  const expectedDate = getFormattedExpectedDate();

  function getFormattedExpectedDate() {
    const expectedDuration = Math.floor(durationInMinutes / inputValue);
    const expectedDate = getCurrentDate().add(expectedDuration, 'day');

    return [expectedDate.year(), expectedDate.month() + 1, expectedDate.date()];
  }

  useEffect(() => {
    const weeklyStudyTime = convertMinutesToSeconds(inputValue * 7);
    const index_list = indexes!.index_list;
    const schedulingList: number[] = [];
    let currWeekDurationSum = 0;
    let currWeekVideoCount = 0;

    index_list.forEach((video, index) => {
      const videoDuration = video.duration;

      if (currWeekDurationSum + videoDuration <= weeklyStudyTime) {
        currWeekVideoCount++;
        currWeekDurationSum += videoDuration;
      } else {
        if (
          currWeekVideoCount === 0 ||
          videoDuration < (weeklyStudyTime - currWeekDurationSum) * 2
        ) {
          currWeekVideoCount++;
          currWeekDurationSum += videoDuration;

          schedulingList.push(currWeekVideoCount);
          currWeekVideoCount = 0;
          currWeekDurationSum = 0;
        } else {
          schedulingList.push(currWeekVideoCount);
          currWeekVideoCount = 1;
          currWeekDurationSum = videoDuration;
        }
      }

      if (index === index_list.length - 1) {
        schedulingList.push(currWeekVideoCount);
      }
    });

    setScheduling(schedulingList);
  }, [inputValue, durationInMinutes, indexes]);

  useEffect(() => {
    controls.set('initial');
    controls.start('animate');
  }, [inputValue, controls]);

  return (
    <Modal
      id={ModalIDs.SCHEDULING}
      className='rounded-none min-w-[44rem] min-h-[48rem] px-12 py-16'
      onClose={onClose}
    >
      <AnimatePresence>
        <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
          <div className='flex flex-col items-center justify-center h-16 gap-5'>
            <p className='text-xl font-bold'>강의 일정관리 설정</p>
            <p className='text-base text-zinc-500'>
              매 주차별로 강의를 묶어 제공해 드려요
            </p>
          </div>
          <div className='bg-zinc-100 w-[37rem] h-96 px-16 py-10 flex flex-col gap-12'>
            <p>일평균 목표 학습 시간을 입력해 주세요</p>
            <SchedulingSlider
              min={THIRTY_MINUTES}
              max={sliderMaxValue}
              step={THIRTY_MINUTES}
              value={inputValue}
              setValue={setInputValue}
            />
            <div className='flex flex-col gap-3'>
              <p className={DEFAULT_CONTENT}>
                선택하신
                <span className={`${MUTABLE_CONTENT} max-w-[300px]`}>
                  {lecture_title}
                </span>
                강의의
              </p>
              <p className={DEFAULT_CONTENT}>
                총 수강 시간은
                <span className={`${MUTABLE_CONTENT}`}>
                  {Math.floor(durationInMinutes / 60)}
                </span>
                시간
                <span className={MUTABLE_CONTENT}>
                  {Math.floor(durationInMinutes % 60)}
                </span>
                분 입니다.
              </p>
              <p className={DEFAULT_CONTENT}>
                주 평균
                <span className={MUTABLE_CONTENT}>
                  <motion.p {...animationConfig}>{weeklyStudyTime}</motion.p>
                </span>
                분 분량으로
                <span className={MUTABLE_CONTENT}>
                  <motion.p {...animationConfig}>{scheduling.length}</motion.p>
                </span>
                주차로 구성되며
              </p>
              <p className={DEFAULT_CONTENT}>
                예상 수강 종료일은
                <span className={MUTABLE_CONTENT}>
                  <motion.p {...animationConfig}>{expectedDate[0]}</motion.p>
                </span>
                년
                <span className={MUTABLE_CONTENT}>
                  <motion.p {...animationConfig}>{expectedDate[1]}</motion.p>
                </span>
                월
                <span className={MUTABLE_CONTENT}>
                  <motion.p {...animationConfig}>{expectedDate[2]}</motion.p>
                </span>
                일 입니다.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-10 text-xl font-bold'>
            <p className='flex gap-1'>
              총 재생 시간 :
              <span className='text-orange-500'>
                {getFormattedHour(
                  convertSecondsToMinutes(lectureDetail.duration)
                )}
              </span>
            </p>
            <Button className='font-semibold w-[25rem] text-white bg-zinc-800'>
              완료
            </Button>
          </div>
        </div>
      </AnimatePresence>
    </Modal>
  );
}
