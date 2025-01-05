import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
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
      return fetchErrorHandling(res, ErrorMessage.ENROLLMENT);
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
      return fetchErrorHandling(res, ErrorMessage.ENROLLMENT);
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
      return fetchErrorHandling(res, ErrorMessage.DETAIL_COURSE);
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
      return fetchErrorHandling(res, ErrorMessage.CLASSROOM);
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
      return fetchErrorHandling(res, ErrorMessage.CLASSROOM);
    }
  });
}

export async function fetchCourseMaterialWorkbook(course_id: number) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(`${Endpoints.COURSES}/materials/${course_id}`), {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<CourseMaterialWorkbook>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.COURSE_MATERIALS);
    }
  });
}
