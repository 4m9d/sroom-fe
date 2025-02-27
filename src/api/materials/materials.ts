import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';

export async function fetchCourseMaterials(course_video_id: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(`${Endpoints.MATERIALS}/${course_video_id}`, {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseMaterials>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.COURSE_MATERIALS);
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
      return fetchErrorHandling(res, ErrorMessage.LECTURENOTES);
    }
  });
}

export async function updateCourseQuizGrade(
  course_video_id: number,
  params: UpdateQuizGradeParams[]
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
      return fetchErrorHandling(res, ErrorMessage.QUIZZES);
    }
  });
}

export async function submitCourseMaterialFeedback(
  type: CourseMaterialType,
  material_id: number,
  params: SubmitFeedbackParams
) {
  const headers = await getAuthorizedHeaders();
  const body = JSON.stringify(params);
  return await fetch(
    getQueryURL(`${Endpoints.MATERIALS}/${material_id}/feedback`, { type }),
    {
      method: 'POST',
      headers,
      body
    }
  ).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<Response>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.MATERIAL_FEEDBACK);
    }
  });
}
