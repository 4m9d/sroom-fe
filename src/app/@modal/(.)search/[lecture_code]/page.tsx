'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchLectureDetail } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import LectureDetailModal from '@/src/components/lectureDetail/LectureDetailModal';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';

export default function LectureDetailModalIntercepter({
  params: { lecture_code }
}: LectureDetailModalParams) {
  const { data: lectureDetail } = useQuery(
    [QueryKeys.DETAIL, lecture_code],
    () => fetchLectureDetail(lecture_code),
    {
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      suspense: true,
      retry: false
    }
  );

  return (
    <LectureDetailModal
      lectureDetail={lectureDetail as LectureDetail}
      navigationType='soft'
    />
  );
}
