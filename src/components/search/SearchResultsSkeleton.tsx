'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
  searchResultPageRef: React.MutableRefObject<number>;
};

const SearchResultsSkeleton = ({ limit, searchResultPageRef }: Props) => {
  const skeletonArray = [...new Array(limit * searchResultPageRef.current)].map(
    (_, i) => i + 1
  );

  const StyledSkeleton = () => {
    return (
      <div className='w-[42rem] h-[11rem] bg-white drop-shadow-md flex p-3 items-center gap-4'>
        <div className='h-full relative object-cover md:min-w-[calc(9rem*1.78)]'>
          <Skeleton height='100%' width='100%' />
        </div>
        <div className='w-full h-full'>
        </div>
      </div>
    );
  };
  return (
    <ul className='flex flex-wrap gap-8 shrink-0 mt-[5.25rem]'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
};
export default SearchResultsSkeleton;
