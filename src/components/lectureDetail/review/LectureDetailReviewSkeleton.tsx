import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
};

export default function LectureDetailReviewSkeleton({ limit }: Props) {
  const skeletonArray = [...new Array(limit)].map((_, i) => i + 1);

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
}
