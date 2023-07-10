import getQueryURL from '@/src/util/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/getAuthorizedHeaders';

export async function fetchLecturesByKeyword(params: SearchLectureParams) {
  const headers = await getAuthorizedHeaders();
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
  params: LectureDeatilParams
) {
  const headers = await getAuthorizedHeaders();
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
