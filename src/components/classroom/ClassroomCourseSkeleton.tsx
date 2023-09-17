'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
};

const ClassroomCourseSkeleton = ({ limit }: Props) => {
  const skeletonArray = [...new Array(limit)].map((_, i) => i + 1);

  const StyledHeaderSkeleton = () => {
    return (
      <div className='flex items-center justify-end h-12 mb-7'>
        <div className='h-full w-52'>
          <Skeleton height='100%' width='100%' />
        </div>
      </div>
    );
  };

  const StyledCardSkeleton = () => {
    return (
      <div className='w-full h-[11rem] bg-sroom-white flex p-3 gap-4'>
        <div className=' w-full max-w-[15rem] flex items-center'>
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
    <>
      <StyledHeaderSkeleton />
      <ul className='grid grid-cols-1 gap-5 lg:grid-cols-2 shrink-0'>
        {skeletonArray.map((idx) => (
          <StyledCardSkeleton key={'skeleton' + idx} />
        ))}
      </ul>
    </>
  );
};
export default ClassroomCourseSkeleton;
