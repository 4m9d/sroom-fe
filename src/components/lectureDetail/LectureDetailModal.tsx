'use client';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { fetchLectureDetail } from '@/src/api/lectures/search';
import {
  THUMBNAIL_PREVIEW_HEIGHT,
  THUMBNAIL_PREVIEW_MIN_WIDTH
} from '@/src/constants/ui/thumbnail';

type Props = {
  lectureDetail: LectureDetail;
  navigationType: 'soft' | 'hard';
};

export default function LectureDetailModal({
  lectureDetail,
  navigationType
}: Props) {
  const router = useRouter();
  
  const onCloseHandler =
    navigationType === 'soft' ? router.back : () => router.replace('/');

  const {
    thumbnail,
    lecture_title,
    rating,
    channel,
    review_count,
    description
  } = lectureDetail;

  return (
    <Modal className='rounded-none' onClose={onCloseHandler}>
      <div
        className={`flex w-full cursor-pointer ${THUMBNAIL_PREVIEW_HEIGHT.MEDIUM} ${THUMBNAIL_PREVIEW_HEIGHT.LARGE} ${THUMBNAIL_PREVIEW_HEIGHT.XLARGE}`}
      >
        <div
          className={`relative object-cover ${THUMBNAIL_PREVIEW_MIN_WIDTH.MEDIUM} ${THUMBNAIL_PREVIEW_MIN_WIDTH.LARGE} ${THUMBNAIL_PREVIEW_MIN_WIDTH.XLARGE}`}
        >
          <Image fill={true} sizes='100%' src={thumbnail} alt={lecture_title} />
        </div>
        <div className='flex flex-col w-1/2 px-4'>
          <p className='font-semibold h-1/5 sm:text-sm lg:text-base sm:line-clamp-1 lg:line-clamp-2'>
            {lecture_title}
          </p>
          <div className='flex items-center mb-1 h-1/6'>
            <input className='mr-1 bg-orange-300 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mask mask-star-2' />
            <p className='sm:text-xs lg:text-sm'>{rating}</p>
          </div>
          <div className='flex items-center justify-start sm:text-xs lg:text-sm opacity-80 h-1/6'>
            <p className='max-w-[50%] line-clamp-1'>{channel}</p>
            <span className='ml-2 sm:text-xs lg:text-sm badge sm:badge-sm lg:badge-md badge-outline'>{`리뷰 ${review_count}개`}</span>
          </div>
          <p className='mt-1 sm:text-xs lg:text-sm h-1/2 opacity-80 sm:line-clamp-3 lg:line-clamp-5'>
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
