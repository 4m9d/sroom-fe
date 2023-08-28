import { Dispatch } from 'react';
import Button from '../ui/button/Button';
import ArrowRightSVG from '@/public/icon/ArrowRight';

type Props = {
  prevPlayingVideo: LastViewVideo | null;
  nextPlayingVideo: LastViewVideo | null;
  setCurrentPlayingVideo: Dispatch<React.SetStateAction<LastViewVideo>>;
};

export default function PrevNextController({
  prevPlayingVideo,
  nextPlayingVideo,
  setCurrentPlayingVideo
}: Props) {
  const controllerClickHandler = (type: 'prev' | 'next') => {
    if (type === 'prev' && prevPlayingVideo !== null) {
      setCurrentPlayingVideo(() => prevPlayingVideo);
    }
    if (type === 'next' && nextPlayingVideo !== null) {
      setCurrentPlayingVideo(() => nextPlayingVideo);
    }
  };
  return (
    <div className='flex flex-wrap justify-center max-w-screen-lg gap-1 mx-auto my-2 md:gap-3 lg:my-5 lg:px-28 shrink-0'>
      <Button
        onClick={() => controllerClickHandler('prev')}
        disabled={prevPlayingVideo === null}
        id='prev-controller'
        className={`w-28 md:w-32 lg:w-36 flex justify-between items-center font-bold text-lg lg:text-xl hover:scale-105 hover:bg-sroom-gray-300 ${
          prevPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <span className='w-3 rotate-180 lg:w-4 fill-sroom-black-400 stroke-sroom-black-400'>
          <ArrowRightSVG />
        </span>
        <div className='whitespace-nowrap'>이전 강의</div>
      </Button>
      <Button
        onClick={() => controllerClickHandler('next')}
        disabled={nextPlayingVideo === null}
        id='next-controller'
        className={`w-28 md:w-32 lg:w-36 flex justify-between items-center font-bold text-lg lg:text-xl hover:scale-105 hover:bg-sroom-gray-300 ${
          nextPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div className='whitespace-nowrap'>다음 강의</div>
        <span className='w-3 lg:w-4 fill-sroom-black-400 stroke-sroom-black-400'>
          <ArrowRightSVG />
        </span>
      </Button>
    </div>
  );
}
