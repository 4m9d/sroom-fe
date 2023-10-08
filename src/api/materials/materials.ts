import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';

export async function fetchCourseMaterials(course_video_id: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.MATERIALS}/${course_video_id}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseMaterials>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.COURSE_MATERIALS, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function updateCourseLectureNotes(
  course_video_id: number,
  content: string
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify({ content });
  return await fetch(`${Endpoints.MATERIALS}/summaries/${course_video_id}`, {
    method: 'PUT',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<Response>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.LECTURENOTES, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function updateCourseQuizGrade(
  course_video_id: number,
  params: updateQuizGradeParams[]
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(params);
  return await fetch(`${Endpoints.MATERIALS}/quizzes/${course_video_id}`, {
    method: 'POST',
    headers,
    body
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<Response>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.QUIZZES, { cause: API_FETCH_ERROR })
      );
    }
  });
}
