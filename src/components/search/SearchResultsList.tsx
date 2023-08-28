'use client';
import { useState } from 'react';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchLectureCard from './SearchLectureCard';
import LoadMoreButton from '../ui/button/LoadMoreButton';
import setErrorToast from '@/src/util/toast/setErrorToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/search/search';
import Button from '../ui/button/Button';
import Link from 'next/link';

export default async function SearchResultsList({
  requestParam,
  searchResultPageRef
}: {
  requestParam: SearchLectureParams;
  searchResultPageRef: React.MutableRefObject<number>;
}) {
  const [filter, setFilter] = useState<SearchResultsFilter>(
    requestParam.filter
  );

  const updateSearchResultPageRef = (next_page_token: string) => {
    if (next_page_token === '') {
      searchResultPageRef.current = 0;
    }
    searchResultPageRef.current += 1;
  };

  const fetchSearchResults = async ({ pageParam: next_page_token = '' }) => {
    const params: SearchLectureParams = {
      ...requestParam,
      next_page_token,
      filter
    };

    updateSearchResultPageRef(next_page_token);

    return await fetchLecturesByKeyword(params).catch(() => {
      setErrorToast(new Error(ErrorMessage.SEARCH));
      return null;
    });
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QueryKeys.SEARCH, requestParam.keyword, filter],
    fetchSearchResults,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      getNextPageParam: (lastPage) => lastPage?.next_page_token
    }
  );

  const FilterSelect = () => {
    const onSelectHanlder = (value: SearchResultsFilter) => {
      setFilter(value);
    };

    return (
      <div className='flex justify-between h-10 gap-3 text-sm font-medium'>
        <Button
          onClick={() => onSelectHanlder('playlist')}
          className={`!h-10 w-36 border-sroom-gray-500 border ${
            filter === 'playlist'
              ? 'bg-sroom-black-400 text-sroom-white'
              : 'bg-sroom-white text-sroom-black-100'
          }`}
        >
          재생목록만 보기
        </Button>
        <Button
          onClick={() => onSelectHanlder('all')}
          className={`!h-10 w-36 border-sroom-gray-500 border ${
            filter === 'all'
              ? 'bg-sroom-black-400 text-sroom-white'
              : 'bg-sroom-white text-sroom-black-100'
          }`}
        >
          전체보기
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className='flex justify-end mb-5'>
        <FilterSelect />
      </div>
      <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2 shrink-0'>
        {data?.pages.map((page) =>
          page?.lectures.map((lecture: SearchResultsLecture) => (
            <Link
              key={lecture.lecture_code}
              href={`/search/${lecture.lecture_code}`}
            >
              <li>
                <SearchLectureCard lecture={lecture} />
              </li>
            </Link>
          ))
        )}
        {data?.pages[0]?.lectures.length === 0 && (
          <div className='flex justify-center w-full mb-10 bg-orange-50'>
            <p className='text-lg font-semibold'>
              <span className='mr-1'>{requestParam.keyword}</span>에 대한 검색
              결과가 없어요 🧐
            </p>
          </div>
        )}
      </ul>
      {hasNextPage ? (
        <div className='flex justify-center mt-12'>
          <LoadMoreButton title='강의 더보기' onClick={fetchNextPage} />
        </div>
      ) : null}
    </>
  );
}
