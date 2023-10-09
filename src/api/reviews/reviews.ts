import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';

export async function fetchReviewListByCourse(courseId: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.REVIEWS}/courses/${courseId}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseReviewResponse>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.REVIEW_LIST);
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
      return fetchErrorHandling(res, ErrorMessage.REVIEW_UPDATE);
    }
  });
}
