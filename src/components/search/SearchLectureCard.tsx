import { THUMBNAIL_PREVIEW_HEIGHT, THUMBNAIL_PREVIEW_MIN_WIDTH } from '@/src/constants/ui/thumbnail';
import { decode } from 'html-entities';
import Image from 'next/image';

export default function SearchLectureCard({ lecture }: { lecture: Lecture }) {
  const {
    lectureTitle,
    description,
    channel,
    lectureCode,
    rating,
    reviewCount,
    thumbnail,
    isPlaylist,
    isEnrolled
  } = lecture;

  // TODO: 플레이리스트 여부, 등록 여부에 따른 UI 구현
  const decodedLectureTitle = decode(lectureTitle);
  const decodedChannel = decode(channel);
  const decodedDescription = decode(description);

  return (
    <li
      className={`flex w-full cursor-pointer ${THUMBNAIL_PREVIEW_HEIGHT.MEDIUM} ${THUMBNAIL_PREVIEW_HEIGHT.LARGE}`}
    >
      <div className={`relative object-cover ${THUMBNAIL_PREVIEW_MIN_WIDTH.MEDIUM} ${THUMBNAIL_PREVIEW_MIN_WIDTH.LARGE}`}>
        <Image fill={true} sizes='100%' src={thumbnail} alt={decodedLectureTitle} />
      </div>
      <div className='flex flex-col w-1/2 px-4'>
        <p className='font-semibold h-1/5 sm:text-sm lg:text-base sm:line-clamp-1 lg:line-clamp-2'>
          {decodedLectureTitle}
        </p>
        <div className='flex items-center mb-1 h-1/6'>
          <input className='mr-1 bg-orange-300 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mask mask-star-2' />
          <p className='sm:text-xs lg:text-sm'>{rating}</p>
        </div>
        <div className='flex items-center justify-start sm:text-xs lg:text-sm opacity-80 h-1/6'>
          <p className='max-w-[50%] line-clamp-1'>{decodedChannel}</p>
          <span className='ml-2 sm:text-xs lg:text-sm badge sm:badge-sm lg:badge-md badge-outline'>{`리뷰 ${reviewCount}개`}</span>
        </div>
        <p className='mt-1 sm:text-xs lg:text-sm h-1/2 opacity-80 sm:line-clamp-3 lg:line-clamp-5'>
          {decodedDescription}
        </p>
      </div>
    </li>
  );
}
