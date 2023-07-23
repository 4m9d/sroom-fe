'use client';
import { fetchLectureDetailReview } from '@/src/api/lectures/search';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import LoadMoreButton from '../../ui/LoadMoreButton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import {
  STALE_TIME,
  CACHE_TIME,
  REVIEW_LIMIT
} from '@/src/constants/detail/detail';
import LectureDetailReviewCard from './LectureDetailReviewCard';
import setErrorToast from '@/src/util/setErrorToast';

let offset = 0;

export default async function LectureDetailReviewList({
  lectureCode,
  reviewPageRef
}: {
  lectureCode: string;
  reviewPageRef: React.MutableRefObject<number>;
}) {
  const fetchLectureReviewList = async () => {
    const params: LectureDeatilParams = {
      review_only: true,
      review_offset: offset,
      review_limit: REVIEW_LIMIT
    };
    
    reviewPageRef.current += 1;

    return await fetchLectureDetailReview(lectureCode, params)
      .then((res) => {
        offset += res.length ? res.length : 0;
        return res;
      })
      .catch(() => {
        setErrorToast(new Error(ErrorMessage.DETAIL_REVIEW));
        return null;
      });
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [QueryKeys.LECTURE_REVIEW, lectureCode],
    fetchLectureReviewList,
    {
      refetchOnWindowFocus: false,
      suspense: true,
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.length > 0 ? true : false
    }
  );

  return (
    <>
      <ul className='grid grid-cols-1'>
        {data?.pages.map((page) =>
          page?.map((lectureReview) => (
            <LectureDetailReviewCard
              key={lectureReview.index}
              lectureReview={lectureReview}
            />
          ))
        )}
      </ul>
      <div className='flex justify-center my-10 mb-20'>
        {hasNextPage ? <LoadMoreButton onClick={fetchNextPage} /> : null}
      </div>
    </>
  );
}
