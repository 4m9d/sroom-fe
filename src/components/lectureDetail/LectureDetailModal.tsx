'use client';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import LectureDetailTabNav from './LectureDetailTabNav';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import LectureDetailIndexList from './index/LectureDetailIndexList';
import LectureDetailReviewList from './review/LectureDetailReviewList';
import LectureDetailCard from './LectureDetailCard';
import LectureDetailIndexSkeleton from './index/LectureDetailIndexSkeleton';
import {
  INDEX_LIMIT,
  REVIEW_LIMIT
} from '@/src/constants/lectureDetail/lectureDetail';
import LectureDetailHeading from './LectureDetailHeading';
import LectureDetailReviewSkeleton from './review/LectureDetailReviewSkeleton';
import OneStar from '../ui/rating/OneStar';
import { ModalIDs } from '@/src/constants/modal/modal';
import LectureEnrollmentModal from '../lectureEnrollment/LectureEnrollmentModal';
import { closeModalHandler } from '@/src/util/modal/modalHandler';
import SchedulingModal from '../lectureEnrollment/SchedulingModal';

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
  const indexPageRef = useRef<number>(0);
  const reviewPageRef = useRef<number>(0);

  const onCloseHandler = useMemo(() => {
    return navigationType === 'soft'
      ? router.back
      : () => router.replace('/dashboard');
  }, [navigationType, router]);
  const isTheOnlyModalInPage = () => {
    return document.querySelectorAll('dialog[open]').length === 1;
  };

  useEffect(() => {
    const modal = document.getElementById(
      ModalIDs.LECTURE_DETAIL
    ) as HTMLDialogElement;

    modal.showModal();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTheOnlyModalInPage()) {
        console.log(isTheOnlyModalInPage());
        onCloseHandler();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseHandler]);

  return (
    <>
      <Modal
        id={ModalIDs.LECTURE_DETAIL}
        className='relative h-full pt-14 p-5 lg:p-14 rounded-none scroll-smooth md:min-w-[70vw] md:max-w-[70vw] min-w-[85vw] max-w-[85vw]'
        onClose={onCloseHandler}
      >
        <LectureDetailCard
          lectureDetail={lectureDetail}
          onClose={onCloseHandler}
        />
        <LectureDetailTabNav is_playlist={is_playlist} />
        <section id='indexes'>
          {is_playlist && (
            <>
              <LectureDetailHeading title={'목차'} />
              <Suspense
                fallback={
                  <LectureDetailIndexSkeleton
                    indexPageRef={indexPageRef}
                    limit={INDEX_LIMIT}
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
            <div className='flex items-center justify-center gap-1 ml-1'>
              <p>{`(${lectureDetail.review_count})`}</p>
              {lectureDetail.review_count > 0 && (
                <>
                  <OneStar className='w-4 h-4' />
                  <p className='text-base font-medium text-sroom-brand'>
                    {rating}
                  </p>
                </>
              )}
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
      {is_playlist && (
        <>
          <LectureEnrollmentModal
            lectureDetail={lectureDetail}
            onClose={() => closeModalHandler('LECTURE_ENROLLMENT')}
            onEnrollSuccess={onCloseHandler}
          />
          <SchedulingModal
            lectureDetail={lectureDetail}
            onClose={() => closeModalHandler('SCHEDULING')}
            onEnrollSuccess={onCloseHandler}
          />
        </>
      )}
    </>
  );
}
