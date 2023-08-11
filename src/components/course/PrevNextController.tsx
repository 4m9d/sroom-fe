import { Dispatch } from 'react';
import Button from '../ui/button/Button';

type Props = {
  prevPlayingVideo: CurrentPlayingVideo | null;
  nextPlayingVideo: CurrentPlayingVideo | null;
  setCurrentPlayingVideo: Dispatch<React.SetStateAction<CurrentPlayingVideo>>;
};

export default function PrevNextController({
  prevPlayingVideo,
  nextPlayingVideo,
  setCurrentPlayingVideo
}: Props) {
  const controllerClickHandler = (type: 'prev' | 'next') => {
    if (type === 'prev' && prevPlayingVideo !== null) {
      setCurrentPlayingVideo(prevPlayingVideo);
    }
    if (type === 'next' && nextPlayingVideo !== null) {
      setCurrentPlayingVideo(nextPlayingVideo);
    }
  };
  return (
    <div className='flex justify-between my-5 px-80 shrink-0'>
      <Button
        onClick={() => controllerClickHandler('prev')}
        disabled={prevPlayingVideo === null}
        id='prev-controller'
        className={`w-[11.5rem] h-12 flex justify-between items-center gap-7 font-bold text-lg ${
          prevPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div>〈</div>
        <div>이전 강의</div>
      </Button>
      <Button
        onClick={() => controllerClickHandler('next')}
        disabled={nextPlayingVideo === null}
        id='next-controller'
        className={`w-[11.5rem] h-12 flex justify-between items-center gap-7 font-bold text-lg ${
          nextPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div>다음 강의</div>
        <div>〉</div>
      </Button>
    </div>
  );
}
