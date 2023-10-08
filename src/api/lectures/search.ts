import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { API_FETCH_ERROR, ErrorMessage } from '../ErrorMessage';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';

export async function fetchLecturesByKeyword(params: SearchLectureParams) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(Endpoints.LECTURES, params), {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<SearchResultsList>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.SEARCH, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchLectureDetail(
  lecture_code: string,
  params?: LectureDeatilParams
) {
  const headers = await getAuthorizedHeaders();
  return await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lecture_code}`, params),
    {
      method: 'GET',
      headers
    }
  ).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LectureDetail>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.DETAIL, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchLectureDetailIndex(
  lecture_code: string,
  params?: LectureIndexParams
) {
  const headers = await getAuthorizedHeaders();
  return await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lecture_code}`, params),
    {
      method: 'GET',
      headers
    }
  ).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LectureIndexList>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.DETAIL_INDEX, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchLectureDetailReview(
  lecture_code: string,
  params?: LectureReviewParams
) {
  const headers = await getAuthorizedHeaders();
  return await fetch(
    getQueryURL(`${Endpoints.LECTURES}/${lecture_code}`, params),
    {
      method: 'GET',
      headers
    }
  ).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LectureReviewList>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.DETAIL_REVIEW, { cause: API_FETCH_ERROR })
      );
    }
  });
}

export async function fetchLectureRecommendations() {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(`${Endpoints.LECTURES}/recommendations`), {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<LectureRecommendations>;
    } else {
      return Promise.reject(
        new Error(ErrorMessage.RECOMMENDATIONS, { cause: API_FETCH_ERROR })
      );
    }
  });
}
