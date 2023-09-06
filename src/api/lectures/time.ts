import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import getQueryURL from '@/src/util/http/getQueryURL';

export async function updateViewDuration(
  params: CourseTakingParams,
  isCompletedManually: boolean = false
) {
  const headers = await getAuthorizedHeaders();
  const { course_video_id, view_duration } = params;
  const body = JSON.stringify({ view_duration });

  return await fetch(
    getQueryURL(
      `${Endpoints.LECTURES}/${course_video_id}/time`,
      isCompletedManually ? { isCompletedManually } : {}
    ),
    {
      method: 'PUT',
      headers,
      body
    }
  ).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseTakingInfo>;
    } else {
      return Promise.reject(new Error(ErrorMessage.COURSE_TAKING));
    }
  });
}
