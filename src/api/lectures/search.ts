import getQueryURL from '@/src/util/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';

export async function fetchLecturesByKeyword(
  params: SearchLectureParams,
  headers: Headers
) {
  return await fetch(getQueryURL(Endpoints.LECTURES, params), {
    method: 'GET',
    headers
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<SearchResultsList>;
    } else {
      throw new Error(ErrorMessage.search);
    }
  });
}

export async function fetchLectureDetail(
  lectureCode: string,
  params: LectureDeatilParams,
  headers: Headers
) {
  return await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lectureCode}`, params),
    {
      method: 'GET',
      headers
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(ErrorMessage.detail);
    }
  });
}
