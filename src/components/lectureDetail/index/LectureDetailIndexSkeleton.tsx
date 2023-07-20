import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
};

const LectureDetailIndexSkeleton = ({ limit }: Props) => {
  const skeletonArray = [...new Array(limit)].map((_, i) => i + 1);

  const StyledSkeleton = () => {
    return (
      <li className={'flex items-center justify-between h-20 w-full px-4'}>
        <div className='w-full h-full'>
          <Skeleton height='100%' />
        </div>
      </li>
    );
  };
  return (
    <ul className='grid grid-cols-1 gap-y-4'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
};

export default memo(LectureDetailIndexSkeleton);
