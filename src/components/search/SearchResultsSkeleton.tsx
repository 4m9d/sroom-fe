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
      <div className='w-full h-[9.5rem] bg-sroom-white flex p-3 gap-4 drop-shadow-md'>
        <div className=' w-full max-w-[12.5rem] flex items-center'>
          <div className='relative w-full h-0 pb-[56.25%]'>
            <div className='absolute top-0 left-0 object-cover w-full h-full'>
              <Skeleton height='100%' width='100%' />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2 shrink-0 mt-[6.25rem]'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
};
export default SearchResultsSkeleton;
