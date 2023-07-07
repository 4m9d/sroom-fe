import getQueryURL from '@/src/util/getQueryURL';
import { Endpoints } from '../Endpoints';

export async function fetchLecturesByKeyword(
  params: SearchLectureParams,
  headers: HeadersInit
) {
  const response = await fetch(getQueryURL(Endpoints.LECTURES, params), {
    method: 'GET',
    headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json() as Promise<LoginResponse>;
      } else {
        throw new Error('검색 결과를 가져오지 못했어요');
      }
    })
    .catch((err) => {
      console.dir(err);
      return null;
    });

  return response;
}

export async function fetchLectureDetail(
  lectureCode: string,
  params: LectureDeatilParams,
  headers: HeadersInit
) {
  const response = await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lectureCode}`, params),
    {
      method: 'GET',
      headers
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json() as Promise<LoginResponse>;
      } else {
        throw new Error('강의 상세 정보를 가져오지 못했어요');
      }
    })
    .catch((err) => {
      console.dir(err);
      return null;
    });

  return response;
}
