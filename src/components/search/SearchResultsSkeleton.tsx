import {
  GRID_COLS_2,
  SEARCH_LECTURE_CARD
} from '@/src/constants/ui/searchLectureCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  limit: number;
};

export default function SearchResultsSkeleton({ limit }: Props) {
  const skeletonArray = [...new Array(limit)].map((_, i) => i + 1);

  const StyledSkeleton = () => {
    return (
      <li className={SEARCH_LECTURE_CARD.CARD}>
        <div className={SEARCH_LECTURE_CARD.THUMBNAIL}>
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
    <ul className={`${GRID_COLS_2}`}>
      {skeletonArray.map((idx) => (
        <StyledSkeleton key={'skeleton' + idx} />
      ))}
    </ul>
  );
}
