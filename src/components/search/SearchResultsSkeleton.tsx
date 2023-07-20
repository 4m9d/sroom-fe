import { THUMBNAIL_PREVIEW_HEIGHT, THUMBNAIL_PREVIEW_MIN_WIDTH } from '@/src/constants/ui/thumbnail';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
};

const SearchResultsSkeleton = ({ limit }: Props)=> {
  const skeletonArray = [...new Array(limit)].map((_, i) => i + 1);

  const StyledSkeleton = () => {
    return (
      <li
        className={`flex w-full ${THUMBNAIL_PREVIEW_HEIGHT.MEDIUM} ${THUMBNAIL_PREVIEW_HEIGHT.LARGE}`}
      >
        <div
          className={`relative object-cover ${THUMBNAIL_PREVIEW_MIN_WIDTH.MEDIUM} ${THUMBNAIL_PREVIEW_MIN_WIDTH.LARGE}`}
        >
          <Skeleton height='100%' />
        </div>
        <div className='w-1/2 h-full pl-3 mt-1'>
          <Skeleton height='15%' />
          <Skeleton height='15%' />
          <Skeleton height='15%' />
        </div>
      </li>
    );
  };
  return (
    <ul className='grid grid-cols-2 gap-8 px-5 gap-y-4'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
}
export default memo(SearchResultsSkeleton);