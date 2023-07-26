'use client';
import { ChangeEvent, useState } from 'react';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchLectureCard from './SearchLectureCard';
import Select from '../ui/Select';
import Link from 'next/link';
import LoadMoreButton from '../ui/LoadMoreButton';
import setErrorToast from '@/src/util/error/setErrorToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';

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

    return await fetchLecturesByKeyword(params)
      .then((res) => {
        return res;
      })
      .catch(() => {
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
      staleTime: Infinity,
      cacheTime: Infinity,
      getNextPageParam: (lastPage) => lastPage?.next_page_token
    }
  );

  const FilterSelect = () => {
    const onSelectHanlder = (e: ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value as SearchResultsFilter);
    };

    return (
      <Select
        onChange={onSelectHanlder}
        value={filter}
        className='select-ghost select-sm'
      >
        <option value='all'>전체 보기</option>
        <option value='playlist'>재생 목록만 보기</option>
        <option value='video'>영상만 보기</option>
      </Select>
    );
  };

  return (
    <>
      <div className='flex justify-end mb-5'>
        <FilterSelect />
      </div>
      <ul className='grid grid-cols-2 gap-8 px-5 gap-y-4'>
        {data?.pages.map((page) =>
          page?.lectures.map((lecture: Lecture) => (
            <Link
              key={lecture.lecture_code}
              href={`/search/${lecture.lecture_code}`}
              scroll={false}
            >
              <SearchLectureCard lecture={lecture} />
            </Link>
          ))
        )}
      </ul>
      {hasNextPage ? (
        <div className='flex justify-center my-10'>
          <LoadMoreButton onClick={fetchNextPage} />
        </div>
      ) : null}
    </>
  );
}
