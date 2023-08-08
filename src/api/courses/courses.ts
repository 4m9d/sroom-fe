import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';

export async function enrollLectureInNewCourse(params: EnrollLectureInNewCourseParams) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(params.body);
  return await fetch(getQueryURL(Endpoints.COURSES, params.query), {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<EnrollLectureResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.ENROLLMENT));
    }
  });
}

export async function enrollLectureInExistingCourse(
  course_id: number,
  params: EnrollLectureInExistingCourseParams
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(params);
  return await fetch(getQueryURL(`${Endpoints.COURSES}/${course_id}`), {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<EnrollLectureResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.ENROLLMENT));
    }
  });
}
