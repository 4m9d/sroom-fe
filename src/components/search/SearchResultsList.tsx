'use client';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import useToast from '@/src/hooks/useToast';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchLectureCard from '../ui/SearchLectureCard';
import { GRID_COLS_2 } from '@/src/constants/ui/searchLectureCard';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/search/search';
import Button from '../ui/Button';

export default async function SearchResultsList(
  requestParam: SearchLectureParams
) {
  const fetchSearchResults = async ({ pageParam: nextPageToken = '' }) => {
    return await fetchLecturesByKeyword({
      ...requestParam,
      //TODO: next_page_token으로 수정
      nextPageToken
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.search));
        return null;
      });
  };
  const { setErrorToast } = useToast();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QueryKeys.SEARCH, requestParam.keyword],
    fetchSearchResults,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken
    }
  );

  return (
    <>
      <ul className={GRID_COLS_2}>
        {data?.pages.map((page) =>
          page?.lectures.map((lecture: Lecture) => (
            <SearchLectureCard key={lecture.lectureCode} lecture={lecture} />
          ))
        )}
      </ul>
      <div className='flex justify-center my-10'>
        {hasNextPage ? (
          <Button onClick={fetchNextPage} className='mx-auto btn-md btn-wide'>
            {'더보기'}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
