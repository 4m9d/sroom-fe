'use client';
import { ModalIDs } from '@/src/constants/modal/modal';
import Modal from '../../ui/Modal';
import { useLayoutEffect, useState } from 'react';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/src/api/queryKeys';
import {
  fetchReviewListByCourse,
  updateLectureReview
} from '@/src/api/reviews/reviews';
import { CACHE_TIME, STALE_TIME } from '@/src/constants/query/query';
import LoadingSpinner from '../../ui/LoadingSpinner';
import ReviewableLectureList from './lectureCard/ReviewableLectureList';
import ReviewableLectureCard from './lectureCard/ReviewableLectureCard';
import { TEXT_MAX_LENGTH } from '@/src/constants/text/text';
import Button from '../../ui/button/Button';
import FiveStars from '../../ui/rating/FiveStars';

type Props = {
  courseId: number | null;
};
type ratingRange = 0 | 1 | 2 | 3 | 4 | 5;

export default function CourseReviewModal({ courseId }: Props) {
  const [activeTab, setActiveTab] = useState<'require' | 'done'>('require');
  const [editingLectureId, setEditingLectureId] = useState<number | null>(null);
  const [rating, setRating] = useState<ratingRange>(0);
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const stateInitHandler = () => {
    setEditingLectureId(null);
    setRating(0);
    setContent('');
  };

  const { data, status: fetchStatus } = useQuery(
    [QueryKeys.LECTURE_REVIEW, courseId?.toString()],
    () => fetchReviewListByCourse(courseId!),
    {
      staleTime: STALE_TIME,
      cacheTime: CACHE_TIME,
      refetchOnMount: 'always',
      enabled: courseId !== null,
    }
  );

  const { mutate, status: mutateStatus } = useMutation(
    () =>
      updateLectureReview(editingLectureId!, {
        submitted_rating: rating,
        review_content: content
      }),
    {
      onSuccess: () => {
        stateInitHandler();
        queryClient.invalidateQueries([
          QueryKeys.LECTURE_REVIEW,
          courseId?.toString()
        ]);
      }
    }
  );

  const requireReviewList = data?.lectures.filter(
    (reviewableLecture) => reviewableLecture.content === null
  );
  const doneReviewList = data?.lectures.filter(
    (reviewableLecture) => reviewableLecture.content !== null
  );
  const isDataExist = requireReviewList && doneReviewList;
  const isEditMode = editingLectureId !== null;
  const selectedLecture = data?.lectures.find(
    (reviewableLecture) => reviewableLecture.lecture_id === editingLectureId
  );
  const isDisabled =
    content.trim().length === 0 || rating === 0 || mutateStatus === 'loading';

  const reviewContentChangeHandler = (input: string) => {
    setContent(() => input.trim().slice(0, TEXT_MAX_LENGTH + 1));
  };

  const reviewRatingChangeHandler = (input: number) => {
    console.log(input);
    if (input > 5) setRating(() => 5);
    else if (input < 1) setRating(() => 1);
    else setRating(() => input as ratingRange);
  };

  useLayoutEffect(() => {
    stateInitHandler();
  }, [courseId]);

  return (
    <Modal
      id={ModalIDs.LECTURE_REVIEW}
      className='w-[85vw] max-w-6xl px-12 py-16 rounded-none'
      onClose={() => closeModalHandler('LECTURE_REVIEW', stateInitHandler)}
    >
      <div className='flex flex-col items-center justify-between w-full h-full gap-10'>
        <div className='flex flex-col items-center justify-center h-16 gap-4'>
          <p className='text-xl font-bold'>후기 / 평점</p>
          <p className='text-base font-medium'>
            {editingLectureId
              ? selectedLecture?.title
              : '수강하신 강의에 대한 후기가 궁금해요!'}
          </p>
        </div>
        {fetchStatus === 'loading' ? (
          <LoadingSpinner className='text-sroom-brand' />
        ) : (
          <>
            {isEditMode === false && isDataExist && (
              <ReviewableLectureList
                activeTab={activeTab}
                requireReviewList={requireReviewList}
                doneReviewList={doneReviewList}
                setActiveTab={setActiveTab}
                setEditingLectureId={setEditingLectureId}
              />
            )}
            {isEditMode === true && selectedLecture && (
              <div className='flex flex-col items-center justify-center w-full'>
                <div className='w-full border-t border-b border-sroom-gray-400'>
                  <ReviewableLectureCard
                    reviewableLecture={selectedLecture}
                    mode='done'
                  />
                </div>
                <div className='flex items-center justify-between w-full h-16 border-b border-sroom-gray-400'>
                  <p className='font-bold text-sroom-black-400'>
                    강의는 어떠셨나요?
                  </p>
                  <FiveStars
                    onChange={reviewRatingChangeHandler}
                    rating={rating}
                    className='bg-sroom-brand'
                  />
                </div>
                <textarea
                  className='w-full !h-56 p-3 border rounded-none resize-none textarea border-sroom-gray-500'
                  placeholder='후기를 입력해 주세요.'
                  maxLength={TEXT_MAX_LENGTH}
                  onChange={(e) => reviewContentChangeHandler(e.target.value)}
                />
                <div className='flex items-center justify-between w-full gap-5 mt-8'>
                  <Button
                    onClick={stateInitHandler}
                    className='w-1/2 text-sroom-black-400 bg-sroom-gray-400'
                  >
                    뒤로가기
                  </Button>
                  <Button
                    disabled={isDisabled}
                    onClick={mutate}
                    className='w-1/2 text-sroom-white bg-sroom-black-400'
                  >
                    {mutateStatus === 'loading' ? (
                      <LoadingSpinner className='text-sroom-brand loading-sm' />
                    ) : (
                      '등록하기'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
