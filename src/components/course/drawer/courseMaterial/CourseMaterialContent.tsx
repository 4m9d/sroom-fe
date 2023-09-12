'use client';
import { useState } from 'react';
import CourseMaterialTopNav from './CourseMaterialTopNav';
import CloseButton from '@/src/components/ui/button/CloseButton';
import CourseMaterialLectureNotes from './lectureNotes/CourseMaterialLectureNotes';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchCourseMaterials } from '@/src/api/materials/materials';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import LoadingSpinnerSVG from '@/public/icon/LoadingSpinner';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import CourseMaterialQuizzes from './quizzes/CourseMaterialQuizzes';
import ForbiddenSVG from '@/public/icon/Forbidden';

type Props = {
  courseVideoId: number;
  drawerHandler: () => void;
};

const STATUS = {
  ERROR: -1,
  PENDING: 0,
  SUCCESS: 1
} as const;

const REFETCH_INTERVAL = 10 * ONE_SECOND_IN_MS;

export default function CourseMaterialContent({
  courseVideoId,
  drawerHandler
}: Props) {
  const [activeTab, setActiveTab] =
    useState<CourseMaterialType>('lecture-notes');
  const { data } = useQuery(
    [QueryKeys.COURSE_MATERIAL, courseVideoId.toString()],
    () => fetchCourseMaterials(courseVideoId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchInterval(data) {
        return data?.status === STATUS.PENDING ? REFETCH_INTERVAL : false;
      }
    }
  );
  return (
    <div className='w-full h-full max-h-full px-3 overflow-y-scroll'>
      <div className='sticky top-0 z-[99999]'>
        <CourseMaterialTopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <CloseButton className='!right-0' onClick={drawerHandler} />
      </div>
      {data && data.status === STATUS.PENDING && (
        <div className='flex flex-col items-center justify-center h-[calc(100%-5rem)] gap-7'>
          <div className='flex items-center justify-center w-12 h-12 animate-spin'>
            <LoadingSpinnerSVG />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='mb-1 text-lg font-semibold text-sroom-black-300'>
              강의 자료를 생성중이에요!
            </p>
            <p className='font-normal text-sroom-black-100'>
              조금만 기다려주세요
            </p>
          </div>
        </div>
      )}
      {data && data.status === STATUS.SUCCESS && (
        <>
          {activeTab === 'lecture-notes' && (
            <CourseMaterialLectureNotes
              lectureNotes={data.summary_brief}
              courseVideoId={courseVideoId}
            />
          )}
          {activeTab === 'quizzes' && (
            <CourseMaterialQuizzes
              quizzes={data.quizzes}
              courseVideoId={courseVideoId}
            />
          )}
        </>
      )}
      {data && data.status === STATUS.ERROR && (
        <div className='flex flex-col items-center justify-center h-[calc(100%-5rem)] gap-7'>
          <div className='flex items-center justify-center animate-pulse'>
            <ForbiddenSVG />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='mb-1 text-lg font-semibold text-sroom-black-300'>
              정책상 강의 자료를 생성할 수 없어요!
            </p>
            <p className='font-normal text-sroom-black-100'>
              다른 강의에서 스룸의 AI 자동 생성 자료를 확인해보세요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
