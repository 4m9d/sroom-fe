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
} from '@/src/constants/lectureDetail/lectureDetail';
import LectureDetailReviewCard from './LectureDetailReviewCard';
import setErrorToast from '@/src/util/error/setErrorToast';

export default async function LectureDetailReviewList({
  lectureCode,
  reviewPageRef
}: {
  lectureCode: string;
  reviewPageRef: React.MutableRefObject<number>;
}) {
  const updateReviewPageRef = (offset: number) => {
    if (offset === 0) {
      reviewPageRef.current = 0;
    }
    reviewPageRef.current += 1;
  };

  const checkNextPage = (
    lastPage: LectureReviewList | null,
    allPages: (LectureReviewList | null)[]
  ) =>
    lastPage && lastPage.length > 0 ? allPages.length * lastPage.length : 0;

  const fetchLectureReviewList = async ({ pageParam: offset = 0 }) => {
    const params: LectureReviewParams = {
      review_only: true,
      review_offset: offset,
      review_limit: REVIEW_LIMIT
    };

    updateReviewPageRef(offset);

    return await fetchLectureDetailReview(lectureCode, params)
      .then((res) => {
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
      getNextPageParam: checkNextPage
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
