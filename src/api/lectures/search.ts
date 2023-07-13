import getQueryURL from '@/src/util/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/getAuthorizedHeaders';

export async function fetchLecturesByKeyword(params: SearchLectureParams) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(Endpoints.LECTURES, params), {
    method: 'GET',
    headers,
    cache : 'no-store'
  }).then(async(res) => {
    if (res.ok) {
      return await res.json() as Promise<SearchResultsList>;
    } else {
      return Promise.reject(new Error(ErrorMessage.search));
    }
  });
}

export async function fetchLectureDetail(
  lectureCode: string,
  params: LectureDeatilParams
) {
  const headers = await getAuthorizedHeaders();
  return await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lectureCode}`, params),
    {
      method: 'GET',
      headers
    }
  ).then(async(res) => {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(new Error(ErrorMessage.detail));
    }
  });
}
