import getQueryURL from '@/src/util/getQueryURL';
import { Endpoints } from '../Endpoints';

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
      throw new Error('검색 결과를 불러오지 못했어요');
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
      throw new Error('강의 상세 정보를 불러오지 못했어요');
    }
  });
}
