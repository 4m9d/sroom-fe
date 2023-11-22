import LoadingSpinnerSVG from '@/public/icon/LoadingSpinner';

type Props = {};

export default function CourseMaterialLoading({}: Props) {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100%-5rem)] gap-7'>
      <div className='flex items-center justify-center w-12 h-12 animate-spin'>
        <LoadingSpinnerSVG />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='mb-1 text-lg font-semibold text-sroom-black-300'>
          강의 자료를 생성 중이에요!
        </p>
        <p className='font-normal text-sroom-black-100'>조금만 기다려 주세요</p>
      </div>
    </div>
  );
}
