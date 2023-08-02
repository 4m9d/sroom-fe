'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import LectureDetailIndexCard from './LectureDetailIndexCard';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchLectureDetailIndex } from '@/src/api/lectures/search';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import {
  CACHE_TIME,
  INDEX_LIMIT,
  STALE_TIME
} from '@/src/constants/lectureDetail/lectureDetail';
import LoadMoreButton from '../../ui/button/LoadMoreButton';
import setErrorToast from '@/src/util/error/setErrorToast';

export default async function LectureDetailIndexList({
  lectureCode,
  indexPageRef
}: {
  lectureCode: string;
  indexPageRef: React.MutableRefObject<number>;
}) {
  const updateIndexPageRef = (next_page_token: string) => {
    if (next_page_token === '') {
      indexPageRef.current = 0;
    }
    indexPageRef.current += 1;
  };

  const fetchLectureIndexList = async ({
    pageParam: index_next_token = ''
  }) => {
    const params: LectureDeatilParams = {
      index_only: true,
      index_limit: INDEX_LIMIT,
      index_next_token
    };

    updateIndexPageRef(index_next_token);

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
      <ul className='grid grid-cols-1 gap-4'>
        {data?.pages.map((page) =>
          page?.index_list?.map((lectureIndex, idx) => (
            <LectureDetailIndexCard
              key={lectureIndex.index}
              lectureIndex={lectureIndex}
              indexNum={idx + 1}
            />
          ))
        )}
      </ul>
      <div className='flex justify-center my-10'>
        {hasNextPage ? <LoadMoreButton title='목차 더보기' onClick={fetchNextPage} /> : null}
      </div>
    </>
  );
}
