'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ForbiddenSVG } from '@/public/icons/icons';
import { fetchCourseMaterials } from '@/src/api/materials/materials';
import { QueryKeys } from '@/src/api/queryKeys';
import LoadingSpinner from '@/src/components/ui/LoadingSpinner';
import CloseButton from '@/src/components/ui/button/CloseButton';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import CourseMaterialLoading from './CourseMaterialLoading';
import CourseMaterialTopNav from './CourseMaterialTopNav';
import CourseMaterialLectureNotes from './lectureNotes/CourseMaterialLectureNotes';
import CourseMaterialQuizzes from './quizzes/CourseMaterialQuizzes';

type Props = {
  courseVideoId: number;
  drawerHandler: () => void;
  handleTimestampClick: (formattedTimestamp: string) => void;
};

const STATUS = {
  ERROR: -1,
  PENDING: 0,
  SUCCESS: 1
} as const;

const REFETCH_INTERVAL = 10 * ONE_SECOND_IN_MS;

export default function CourseMaterialContent({
  courseVideoId,
  drawerHandler,
  handleTimestampClick
}: Props) {
  const [activeTab, setActiveTab] = useState<CourseMaterialType>('summary');
  const { data, status } = useQuery(
    [QueryKeys.COURSE_MATERIAL, courseVideoId.toString()],
    () => fetchCourseMaterials(courseVideoId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      refetchInterval(data) {
        return data?.status === STATUS.PENDING ? REFETCH_INTERVAL : false;
      },
      refetchIntervalInBackground: true
    }
  );
  return (
    <div className='h-full max-w-full max-h-full min-w-full px-3 overflow-y-scroll'>
      <div className='sticky top-0 z-10'>
        <CourseMaterialTopNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <CloseButton className='!right-0' onClick={drawerHandler} />
      </div>
      {status === 'loading' ? (
        <div className='flex items-center justify-center w-full h-full'>
          <LoadingSpinner className='text-sroom-brand' />
        </div>
      ) : (
        status === 'success' && (
          <>
            {data && data.status === STATUS.PENDING && (
              <CourseMaterialLoading />
            )}
            {data && data.status === STATUS.SUCCESS && (
              <div>
                {activeTab === 'summary' && (
                  <CourseMaterialLectureNotes
                    lectureNotes={data.summary_brief}
                    courseVideoId={courseVideoId}
                    handleTimestampClick={handleTimestampClick}
                  />
                )}
                {activeTab === 'quiz' && (
                  <CourseMaterialQuizzes
                    quizzes={data.quizzes}
                    courseVideoId={courseVideoId}
                  />
                )}
              </div>
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
                    다른 강의에서 스룸의 AI 자동 생성 자료를 확인해 보세요
                  </p>
                </div>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
