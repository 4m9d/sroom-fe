'use client';
import { fetchCourseDetail } from '@/src/api/courses/courses';
import { QueryKeys } from '@/src/api/queryKeys';
import CourseTaking from '@/src/components/course/CourseTaking';
import { STALE_TIME } from '@/src/constants/query/query';
import { useQuery } from '@tanstack/react-query';

export default function CourseTakingPage({
  params,
  searchParams
}: CourseTakingPageParams) {
  const { data: courseDetail } = useQuery(
    [QueryKeys.COURSE_DETAIL, params.course_id],
    () => fetchCourseDetail(parseInt(params.course_id)),
    {
      cacheTime: 0,
      staleTime: STALE_TIME
    }
  );

  return (
    <div className='min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-zinc-50 flex items-stretch'>
      {courseDetail && (
        <CourseTaking
          courseDetail={courseDetail}
          currentCourseVideoId={
            searchParams.course_video_id
              ? parseInt(searchParams.course_video_id)
              : courseDetail.last_view_video.course_video_id
          }
        />
      )}
    </div>
  );
}
