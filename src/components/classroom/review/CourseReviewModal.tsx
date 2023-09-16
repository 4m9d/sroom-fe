'use client';
import { ModalIDs } from '@/src/constants/modal/modal';
import Modal from '../../ui/Modal';
import { useEffect, useState } from 'react';
import CourseReviewTopNav from './CourseReviewTopNav';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import { fetchReviewListByCourse } from '@/src/api/reviews/reviews';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import ReviewRequireLectureCard from './ReviewRequireLectureCard';
import LoadingSpinner from '../../ui/LoadingSpinner';
import ReviewDoneLectureCard from './ReviewDoneLectureCard';

type Props = {
  courseId: number | null;
};

export default function CourseReviewModal({ courseId }: Props) {
  const [activeTab, setActiveTab] = useState<'require' | 'done'>('require');
  const queryClient = useQueryClient();
  const [reviewList, setReviewList] = useState<ReviewableLecture[]>([]);

  const requireReviewList = reviewList.filter(
    (reviewableLecture) => reviewableLecture.content === null
  );
  const doneReviewList = reviewList.filter(
    (reviewableLecture) => reviewableLecture.content !== null
  );

  useEffect(() => {
    if (courseId === null) return;

    queryClient
      .fetchQuery(
        [QueryKeys.LECTURE_REVIEW, courseId.toString()],
        () => fetchReviewListByCourse(courseId),
        {
          staleTime: STALE_TIME,
          cacheTime: CACHE_TIME
        }
      )
      .then((data) => {
        setReviewList(data.lectures);
      });
  }, [queryClient, courseId]);

  return (
    <Modal
      id={ModalIDs.LECTURE_REVIEW}
      className='w-[85vw] max-w-6xl px-12 py-16 rounded-none'
      onClose={() => closeModalHandler('LECTURE_REVIEW')}
    >
      <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
        <div className='flex flex-col items-center justify-center h-16 gap-4'>
          <p className='text-xl font-bold'>후기 / 평점</p>
          <p className='text-base font-medium'>
            수강하신 강의에 대한 후기가 궁금해요!
          </p>
        </div>
        {reviewList.length === 0 ? (
          <LoadingSpinner className='loading-md bg-sroom-brand' />
        ) : (
          <>
            <CourseReviewTopNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              requireReviewCount={requireReviewList.length}
              doneReviewCount={doneReviewList.length}
            />
            <div className='flex flex-col items-center justify-center w-full h-full gap-5'>
              {activeTab === 'require' &&
                requireReviewList.map((reviewableLecture) => (
                  <ReviewRequireLectureCard
                    key={reviewableLecture.lecture_id}
                    reviewableLecture={reviewableLecture}
                  />
                ))}
              {activeTab === 'done' &&
                doneReviewList.map((reviewableLecture) => (
                  <ReviewDoneLectureCard
                    key={reviewableLecture.lecture_id}
                    reviewableLecture={reviewableLecture}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
