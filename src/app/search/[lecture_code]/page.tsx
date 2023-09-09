'use client';
import { fetchLectureDetail } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const DynamicLectureDetailModal = dynamic(
  () => import('@/src/components/lectureDetail/LectureDetailModal'),
  { ssr: false }
);

export default async function LectureDetail({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const { data: lectureDetail } = useQuery(
    [QueryKeys.DETAIL, lecture_code],
    () => fetchLectureDetail(lecture_code),
    {
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      suspense: true
    }
  );

  return (
    <DynamicLectureDetailModal
      lectureDetail={lectureDetail as LectureDetail}
      navigationType='hard'
    />
  );
}
