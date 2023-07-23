import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
  reviewPageRef: React.MutableRefObject<number>;
};

const LectureDetailReviewSkeleton = ({ limit, reviewPageRef }: Props) => {
  const skeletonArray = [...new Array(limit * reviewPageRef.current)].map(
    (_, i) => i + 1
  );

  const StyledSkeleton = () => {
    return (
      <li className={'flex flex-col h-16'}>
        <div className='w-full h-full'>
          <Skeleton height='100%' />
        </div>
      </li>
    );
  };
  return (
    <ul className='grid grid-cols-1 gap-y-1'>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
};

export default LectureDetailReviewSkeleton;
