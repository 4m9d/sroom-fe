'use client';
import { ChangeEvent, useState } from 'react';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { fetchLecturesByKeyword } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import useToast from '@/src/hooks/useToast';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchLectureCard from './SearchLectureCard';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/search/search';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Link from 'next/link';

export default async function SearchResultsList(
  requestParam: SearchLectureParams
) {
  const [filter, setFilter] = useState<SearchResultsFilter>(
    requestParam.filter
  );
  const { setErrorToast } = useToast();

  const fetchSearchResults = async ({ pageParam: next_page_token = '' }) => {
    return await fetchLecturesByKeyword({
      ...requestParam,
      next_page_token,
      filter
    })
      .then((res) => {
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.search));
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

  const LoadMoreButton = () => {
    return (
      <Button onClick={fetchNextPage} className='mx-auto btn-md btn-wide'>
        {'더보기'}
      </Button>
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
      <div className='flex justify-center my-10'>
        {hasNextPage ? <LoadMoreButton /> : null}
      </div>
    </>
  );
}
