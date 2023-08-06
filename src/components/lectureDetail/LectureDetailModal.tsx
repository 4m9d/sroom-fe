'use client';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import LectureDetailTabNav from './LectureDetailTabNav';
import { Suspense, useEffect, useRef } from 'react';
import LectureDetailIndexList from './index/LectureDetailIndexList';
import LectureDetailReviewList from './review/LectureDetailReviewList';
import LectureDetailCard from './LectureDetailCard';
import LectureDetailIndexSkeleton from './index/LectureDetailIndexSkeleton';
import {
  INDEX_SKELETON_LIMIT,
  REVIEW_LIMIT
} from '@/src/constants/lectureDetail/lectureDetail';
import LectureDetailHeading from './LectureDetailHeading';
import LectureDetailReviewSkeleton from './review/LectureDetailReviewSkeleton';
import OneStar from '../ui/rating/OneStar';

type Props = {
  lectureDetail: LectureDetail;
  navigationType: 'soft' | 'hard';
};

export default function LectureDetailModal({
  lectureDetail,
  navigationType
}: Props) {
  const { is_playlist, lecture_code, rating } = lectureDetail;
  const router = useRouter();
  const onCloseHandler =
    navigationType === 'soft' ? router.back : () => router.replace('/');
  const indexPageRef = useRef<number>(0);
  const reviewPageRef = useRef<number>(0);

  useEffect(() => {
    const modal = document.getElementById(
      'lecture_detail_modal'
    ) as HTMLDialogElement;

    modal.showModal();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseHandler();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  },[onCloseHandler]);

  return (
    <Modal
      id='lecture_detail_modal'
      className='relative h-full !p-14 rounded-none scroll-smooth'
      onClose={onCloseHandler}
    >
      <LectureDetailCard lectureDetail={lectureDetail} />
      <LectureDetailTabNav is_playlist={is_playlist} />
      <section id='indexes'>
        {is_playlist && (
          <>
            <LectureDetailHeading title={'목차'} />
            <Suspense
              fallback={
                <LectureDetailIndexSkeleton
                  indexPageRef={indexPageRef}
                  limit={INDEX_SKELETON_LIMIT}
                />
              }
            >
              <LectureDetailIndexList
                indexPageRef={indexPageRef}
                lectureCode={lecture_code}
              />
            </Suspense>
          </>
        )}
      </section>
      <section id='reviews'>
        <LectureDetailHeading title={'후기'}>
          <div className='flex items-center justify-center ml-2 mr-1'>
            <OneStar className='w-5 h-5' />
            <p className='font-semibold text-orange-500'>{rating}</p>
          </div>
        </LectureDetailHeading>
        <Suspense
          fallback={
            <LectureDetailReviewSkeleton
              reviewPageRef={reviewPageRef}
              limit={REVIEW_LIMIT}
            />
          }
        >
          <LectureDetailReviewList
            reviewPageRef={reviewPageRef}
            lectureCode={lecture_code}
          />
        </Suspense>
      </section>
    </Modal>
  );
}
