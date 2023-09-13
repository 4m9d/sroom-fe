import setUndevelopedAlertToast from '@/src/util/toast/setUndevelopedAlertToast';
import Button from '../ui/button/Button';

type Props = {
  unfinished_course: number;
  completion_rate: number;
};

export default function ClassroomHeader({
  unfinished_course,
  completion_rate
}: Props) {
  return (
    <div className='flex items-center justify-between mb-7'>
      <Button
        onClick={() => setUndevelopedAlertToast('review')}
        className='text-xs md:px-6 md:text-sm bg-sroom-brand text-sroom-white'
      >
        후기 / 평점 작성하기
      </Button>
      <div className='flex gap-1 font-bold'>
        <p className='text-base md:text-lg'>
          완강률
          <span className='pl-1 text-xl md:text-3xl'>{completion_rate}</span>%,
        </p>
        <p className='text-base md:text-lg'>
          미수강 강의
          <span className='pl-1 text-xl md:text-3xl'>{unfinished_course}</span>
          개
        </p>
      </div>
    </div>
  );
}
