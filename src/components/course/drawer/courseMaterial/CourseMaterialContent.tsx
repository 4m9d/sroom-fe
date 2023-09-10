'use client';
import { useState } from 'react';
import CourseMaterialTopNav from './CourseMaterialTopNav';
import CloseButton from '@/src/components/ui/button/CloseButton';
import CourseMaterialLectureNotes from './CourseMaterialLectureNotes';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchCourseMaterials } from '@/src/api/materials/materials';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import LoadingSpinnerSVG from '@/public/icon/LoadingSpinner';

type Props = {
  courseVideoId: number;
  drawerHandler: () => void;
};

const STATUS = {
  ERROR: -1,
  PENDING: 0,
  SUCCESS: 1
} as const;

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
      staleTime: STALE_TIME
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
      {(data && data.status === STATUS.PENDING) && (
        <div className='flex flex-col items-center justify-center h-[calc(100%-5rem)] gap-7'>
          <div className='flex items-center justify-center w-12 h-12 animate-spin'>
            <LoadingSpinnerSVG />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='mb-1 font-semibold text-sroom-black-300'>
              강의 자료를 생성중이에요!
            </p>
            <p className='font-normal text-sroom-black-100'>
              조금만 기다려주세요
            </p>
          </div>
        </div>
      )}
      {data && data.status === STATUS.SUCCESS && (
        <div className='static w-full'>
          {activeTab === 'lecture-notes' && (
            <CourseMaterialLectureNotes
              lectureNotes={data.summary_brief}
              courseVideoId={courseVideoId}
            />
          )}
          {activeTab === 'quizzes' && <></>}
        </div>
      )}
      {data && data.status === STATUS.ERROR && <></>}
    </div>
  );
}
