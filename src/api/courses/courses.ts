import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import { QueryKeys } from '../queryKeys';

export async function enrollLectureInNewCourse(
  params: EnrollLectureInNewCourseParams
) {
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
      return Promise.reject(
        new Error(ErrorMessage.ENROLLMENT, { cause: API_FETCH_ERROR })
      );
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
      return Promise.reject(
        new Error(ErrorMessage.ENROLLMENT, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchCourseDetail(course_id: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(`${Endpoints.COURSES}/${course_id}`), {
    method: 'GET',
    headers,
    next: { tags: [QueryKeys.COURSE_TAKING, course_id.toString()] }
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseDetail>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.DETAIL_COURSE, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchClassroom() {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(`${Endpoints.COURSES}`), {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<ClassRoom>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.CLASSROOM, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function deleteCourse(course_id: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(`${Endpoints.COURSES}/${course_id}`), {
    method: 'DELETE',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<ClassRoom>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.CLASSROOM, { cause: API_FETCH_ERROR })
      );
    }
  });
}
