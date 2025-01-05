import { fetchErrorHandling } from '@/src/util/http/fetchErrorHandling';
import { getAuthorizedHeaders } from '@/src/util/http/getAuthorizedHeaders';
import getQueryURL from '@/src/util/http/getQueryURL';
import { Endpoints } from '../Endpoints';
import { ErrorMessage } from '../ErrorMessage';

export async function fetchLecturesByKeyword(params: SearchLectureParams) {
  const headers = await getAuthorizedHeaders();
  return await fetch(getQueryURL(Endpoints.LECTURES, params), {
    method: 'GET',
    headers
  }).then(async (res) => {
    if (res.ok) {
      return (await res.json()) as Promise<SearchResultsList>;
    } else {
      return fetchErrorHandling(res, ErrorMessage.SEARCH);
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
      return fetchErrorHandling(res, ErrorMessage.DETAIL);
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
      return fetchErrorHandling(res, ErrorMessage.DETAIL_INDEX);
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
      return fetchErrorHandling(res, ErrorMessage.DETAIL_REVIEW);
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
      return fetchErrorHandling(res, ErrorMessage.RECOMMENDATIONS);
    }
  });
}
