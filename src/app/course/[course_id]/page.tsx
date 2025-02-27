'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchCourseDetail } from '@/src/api/courses/courses';
import { QueryKeys } from '@/src/api/queryKeys';
import CourseTaking from '@/src/components/course/CourseTaking';
import { STALE_TIME } from '@/src/constants/query/query';
import {
  hideChannelTalkButton,
  showChannelTalkButton
} from '@/src/util/channelTalk/channelTalk';
import getPageTitle from '@/src/util/metadata/getPageTitle';

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

  useEffect(() => {
    hideChannelTalkButton();

    return () => {
      showChannelTalkButton();
    };
  }, []);

  return (
    <div className='min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-zinc-50 flex items-stretch'>
      {courseDetail && (
        <>
          <title>{getPageTitle(`${courseDetail.course_title}`)}</title>
          <CourseTaking
            courseDetail={courseDetail}
            currentCourseVideoId={
              searchParams.courseVideoId
                ? parseInt(searchParams.courseVideoId)
                : courseDetail.last_view_video.course_video_id
            }
          />
        </>
      )}
    </div>
  );
}
