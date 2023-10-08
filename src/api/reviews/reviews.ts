import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';

export async function fetchReviewListByCourse(courseId: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.REVIEWS}/courses/${courseId}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseReviewResponse>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.REVIEW_LIST, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function updateLectureReview(
  lectureId: number,
  params: UpdateLectureReviewParams
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(params);
  return await fetch(`${Endpoints.REVIEWS}/lectures/${lectureId}`, {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<Response>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.REVIEW_UPDATE, { cause: API_FETCH_ERROR })
      );
    }
  });
}
