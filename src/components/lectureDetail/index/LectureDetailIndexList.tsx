'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import LectureDetailIndexCard from './LectureDetailIndexCard';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureDetailIndex } from '@/src/api/lectures/search';
import useToast from '@/src/hooks/useToast';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import {
  CACHE_TIME,
  INDEX_LIMIT,
  STALE_TIME
} from '@/src/constants/detail/detail';
import LoadMoreButton from '../../ui/LoadMoreButton';

type Props = {
  lectureCode: string;
};

export default async function LectureDetailIndexList({ lectureCode }: Props) {
  const { setErrorToast } = useToast();

  const fetchLectureIndexList = async ({
    pageParam: index_next_token = ''
  }) => {
    const params: LectureDeatilParams = {
      index_only: true,
      index_limit: INDEX_LIMIT,
      index_next_token
    };
    return await fetchLectureDetailIndex(lectureCode, params)
      .then((res) => {
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.DETAIL_INDEX));
        return null;
      });
  };
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QueryKeys.LECTURE_INDEX, lectureCode],
    fetchLectureIndexList,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      getNextPageParam: (lastPage) => lastPage?.next_page_token
    }
  );
  return (
    <>
      <ul className='grid grid-cols-1 gap-y-4'>
        {data?.pages.map((page) =>
          page?.index_list?.map((lectureIndex) => (
            <LectureDetailIndexCard
              key={lectureIndex.index}
              lectureIndex={lectureIndex}
            />
          ))
        )}
      </ul>
      <div className='flex justify-center my-10'>
        {hasNextPage ? <LoadMoreButton onClick={fetchNextPage} /> : null}
      </div>
    </>
  );
}
