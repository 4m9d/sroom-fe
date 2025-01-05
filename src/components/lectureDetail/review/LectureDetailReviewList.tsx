'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ErrorMessage } from '@/src/api/ErrorMessage';
import { fetchLectureDetailReview } from '@/src/api/lectures/search';
import { QueryKeys } from '@/src/api/queryKeys';
import { STALE_TIME, CACHE_TIME } from '@/src/constants/query/query';
import { REVIEW_LIMIT } from '@/src/constants/skeleton/skeleton';
import setErrorToast from '@/src/util/toast/setErrorToast';
import LoadMoreButton from '../../ui/button/LoadMoreButton';
import LectureDetailReviewCard from './LectureDetailReviewCard';

export default function LectureDetailReviewList({
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
  ) => {
    if (lastPage === null || lastPage.length === 0) return undefined;

    return allPages.length * lastPage.length;
  };

  const fetchLectureReviewList = async ({ pageParam: offset = 0 }) => {
    const params: LectureReviewParams = {
      review_only: true,
      review_offset: offset,
      review_limit: REVIEW_LIMIT
    };

    updateReviewPageRef(offset);

    const lectureDetailReview = await fetchLectureDetailReview(
      lectureCode,
      params
    ).catch(() => {
      setErrorToast(new Error(ErrorMessage.DETAIL_REVIEW));
      return null;
    });
    return lectureDetailReview;
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

  const review_list = data?.pages.flatMap((page) => page) as LectureReview[];

  return (
    <>
      {review_list.length === 0 ? (
        <>
          <div className='flex items-center justify-center w-full pb-6 border-b h-36 border-b-sroom-gray-500'>
            <p className='text-base font-normal text-sroom-black-400'>
              아직 등록된 후기가 없어요
            </p>
          </div>
        </>
      ) : (
        <>
          <ul className='grid grid-cols-1 gap-4'>
            {review_list &&
              review_list.map((lectureReview) => (
                <LectureDetailReviewCard
                  key={lectureReview.index}
                  lectureReview={lectureReview}
                />
              ))}
          </ul>
          <div className='flex justify-center my-10 mb-20'>
            {hasNextPage ? review_list.length >= REVIEW_LIMIT && (
              <LoadMoreButton title='후기 더보기' onClick={fetchNextPage} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
