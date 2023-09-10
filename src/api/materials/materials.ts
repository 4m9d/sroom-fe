import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
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
      return Promise.reject(new Error(ErrorMessage.COURSE_MATERIALS));
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
      return (await res.json()) as Promise<UpdateLectureNoteResponse>;
    } else {
      return Promise.reject(new Error(ErrorMessage.LECTURENOTE));
    }
  });
}
