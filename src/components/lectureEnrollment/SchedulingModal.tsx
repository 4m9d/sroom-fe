'use client';
import Modal from '../ui/Modal';
import Button from '../ui/button/Button';
import SchedulingSlider from '../scheduling/SchedulingSlider';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalIDs } from '@/src/constants/modal/modal';
import { useCallback, useEffect, useState } from 'react';
import getFormattedTime from '@/src/util/time/getFormattedTime';
import convertSecondsToMinutes from '@/src/util/time/convertSecondsToMinutes';
import {
  FOUR_HOURS_IN_MINUTES,
  THIRTY_MINUTES
} from '@/src/constants/time/time';
import getCurrentDate from '@/src/util/day/getCurrentDate';
import convertMinutesToSeconds from '@/src/util/time/convertMinutesToSeconds';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollLectureInNewCourse } from '@/src/api/courses/courses';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import LoadingSpinner from '../ui/LoadingSpinner';
import getCompactDateFormat from '@/src/util/day/getCompactFormattedDate';
import setLectureEnrollToast from '@/src/util/toast/setLectureEnrollToast';
import { useRouter } from 'next/navigation';
import { QueryKeys } from '@/src/api/queryKeys';

type Props = {
  lectureDetail: LectureDetail;
  onClose: () => void;
  onEnrollSuccess: () => void;
};

export default function SchedulingModal({
  lectureDetail,
  onClose,
  onEnrollSuccess
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const enrollLecture = async () => {
    const enrollLectureInNewCourseParams: EnrollLectureInNewCourseParams = {
      query: {
        use_schedule: true
      },
      body: {
        lecture_code: lectureDetail.lecture_code,
        daily_target_time: inputValue,
        scheduling,
        expected_end_date: getCompactDateFormat(expectedDate.join(), '-')
      }
    };
    return await enrollLectureInNewCourse(enrollLectureInNewCourseParams).catch(
      () => {
        setErrorToast(new Error(ErrorMessage.SEARCH));
        return null;
      }
    );
  };

  const { mutate, isLoading } = useMutation(enrollLecture, {
    onSuccess: (response) => {
      onEnrollSuccess();
      response &&
        setLectureEnrollToast(() =>
          router.push(`/course/${response.course_id}`)
        );
      queryClient.invalidateQueries([
        QueryKeys.DETAIL,
        lectureDetail.lecture_code
      ]);
    }
  });
  const { lecture_title, lecture_code } = lectureDetail;
  const { duration, index_list } = queryClient.getQueryData([
    QueryKeys.LECTURE_INDEX,
    lecture_code
  ]) as LectureIndexList;

  const durationInMinutes = convertSecondsToMinutes(duration as number);
  const convertedDuration =
    Math.floor(durationInMinutes / THIRTY_MINUTES) * THIRTY_MINUTES;
  const sliderMaxValue = Math.max(
    Math.min(FOUR_HOURS_IN_MINUTES, convertedDuration),
    THIRTY_MINUTES
  );
  const DEFAULT_CONTENT =
    'flex items-center gap-1 h-8 text-lg text-sroom-black-200';
  const MUTABLE_CONTENT =
    'align-middle px-3 py-1 font-semibold bg-sroom-white border border-sroom-gray-400 text-sroom-black-400  whitespace-normal line-clamp-1 break-all';

  const animationConfig = {
    initial: { opacity: 0, y: '10%' },
    animate: { opacity: 1, y: '0%' },
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

  const reschedule = useCallback(() => {
    const weeklyStudyTime = convertMinutesToSeconds(inputValue * 7);
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
  }, [index_list, inputValue]);

  useEffect(() => {
    reschedule();
  }, [inputValue, durationInMinutes, reschedule]);

  return (
    <Modal
      id={ModalIDs.SCHEDULING}
      className='max-w-2xl px-12 py-16 rounded-none'
      onClose={onClose}
    >
      <AnimatePresence>
        <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
          <div className='flex flex-col items-center justify-center h-16 gap-4'>
            <p className='text-xl font-bold'>강의 일정 관리 설정</p>
            <p className='text-base font-medium'>
              매 주차별로 강의를 묶어 제공해 드려요
            </p>
          </div>
          <div className='bg-sroom-gray-200 border border-sroom-gray-500 w-[37rem] h-96 px-16 py-10 flex flex-col gap-12'>
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
                  <motion.span
                    className='block'
                    key={weeklyStudyTime}
                    {...animationConfig}
                  >
                    {weeklyStudyTime}
                  </motion.span>
                </span>
                분 분량으로
                <span className={MUTABLE_CONTENT}>
                  <motion.span
                    className='block'
                    key={scheduling.length}
                    {...animationConfig}
                  >
                    {scheduling.length}
                  </motion.span>
                </span>
                주차로 구성되며
              </p>
              <p className={DEFAULT_CONTENT}>
                예상 수강 종료일은
                <span className={MUTABLE_CONTENT}>
                  <motion.span
                    className='block'
                    key={expectedDate[0]}
                    {...animationConfig}
                  >
                    {expectedDate[0]}
                  </motion.span>
                </span>
                년
                <span className={MUTABLE_CONTENT}>
                  <motion.span
                    className='block'
                    key={expectedDate[1]}
                    {...animationConfig}
                  >
                    {expectedDate[1]}
                  </motion.span>
                </span>
                월
                <span className={MUTABLE_CONTENT}>
                  <motion.span
                    className='block'
                    key={expectedDate[2]}
                    {...animationConfig}
                  >
                    {expectedDate[2]}
                  </motion.span>
                </span>
                일 입니다.
              </p>
            </div>
          </div>
          <div className='flex flex-col items-center gap-10 text-xl font-bold'>
            <p className='flex gap-1'>
              총 재생 시간 :
              <span className='text-sroom-brand'>
                {getFormattedTime(convertSecondsToMinutes(duration as number))}
              </span>
            </p>
            <Button
              onClick={() => mutate()}
              className='w-[25rem] text-sroom-white bg-sroom-black-400'
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner className='text-sroom-brand loading-sm' />
              ) : (
                '완료'
              )}
            </Button>
          </div>
        </div>
      </AnimatePresence>
    </Modal>
  );
}
