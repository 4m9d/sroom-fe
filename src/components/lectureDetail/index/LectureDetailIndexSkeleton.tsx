import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
  indexPageRef: React.MutableRefObject<number>;
};

const LectureDetailIndexSkeleton = ({ limit, indexPageRef }: Props) => {
  const skeletonArray = [...new Array(limit * indexPageRef.current)].map(
    (_, i) => i + 1
  );

  const StyledSkeleton = () => {
    return (
      <li className={'flex items-center justify-between h-[4.5rem]'}>
        <div className='w-full h-full'>
          <Skeleton height='100%' />
        </div>
      </li>
    );
  };
  return (
    <ul className='grid grid-cols-1 gap-4'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
};

export default LectureDetailIndexSkeleton;
