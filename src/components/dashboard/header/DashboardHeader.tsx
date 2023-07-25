import GuideBox from './GuideBox';

type Props = {
  isEnrolled: boolean;
};

export default function DashboardHeader({ isEnrolled }: Props) {
  if (isEnrolled) {
    return (
      <section className='h-64 px-20 py-10'>
        <h2 className='font-bold md:mb-2 lg:mb-3 lg:text-4xl md:text-3xl'>
          안녕하세요!
        </h2>
        <h3 className='font-semibold lg:text-2xl md:text-xl'>
          거 참 공부하기 딱 좋은 날씨네요 😉
        </h3>
      </section>
    );
  } else {
    return (
      <section className='relative flex flex-col items-center h-[23rem] px-20 pt-14 bg-zinc-100'>
        <h2 className='mb-5 text-4xl font-bold'>반가워요!</h2>
        <h3 className='flex flex-col items-center text-base font-semibold'>
          <p>유튜브에 저장만 해놨던 강의, 듣다가 중간에 포기해버린 강의</p>
          <p>이젠 스룸과 함께 체계적으로 학습을 시작해 보세요!</p>
        </h3>
        <div className='absolute bottom-0 flex items-end justify-between w-full px-20 gap-7'>
          <GuideBox title='스마트한' description='유튜브 강의 검색･추천' />
          <GuideBox title='체계적인' description='학습 일정 관리' />
          <GuideBox title='쪽집게 AI가 생성한' description='퀴즈･요약본' />
        </div>
      </section>
    );
  }
}
