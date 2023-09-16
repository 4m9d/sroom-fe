import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';

export async function fetchReviewListByCourse(courseId: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.REVIEWS}/courses/${courseId}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseReviewResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.REVIEWS));
    }
  });
}
