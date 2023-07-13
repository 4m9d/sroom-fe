'use client';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import useToast from '@/src/hooks/useToast';
import { useQuery } from '@tanstack/react-query';
import SearchLectureCard from '../ui/SearchLectureCard';
import { GRID_COLS_2 } from '@/src/constants/ui/searchLectureCard';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/search/search';

const queryOptions = {
  refetchOnWindowFocus: false,
  suspense: true,
  staleTime: STALE_TIME,
  cacheTime: CACHE_TIME
};

export default async function SearchResultsList(
  requestParam: SearchLectureParams
) {
  const fetchSearchResults = async () => {
    return await fetchLecturesByKeyword(requestParam)
      .then((res) => {
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.search));
        return null;
      });
  };
  const { setErrorToast } = useToast();
  const { data } = useQuery(
    [QueryKeys.SEARCH, requestParam.keyword],
    fetchSearchResults,
    queryOptions
  );

  return (
    <>
      <ul className={GRID_COLS_2}>
        {data?.lectures.map((lecture: Lecture) => (
          <SearchLectureCard key={lecture.lectureCode} lecture={lecture} />
        ))}
      </ul>
    </>
  );
}
