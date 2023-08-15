import { Dispatch } from 'react';
import Button from '../ui/button/Button';

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
      setCurrentPlayingVideo(prevPlayingVideo);
    }
    if (type === 'next' && nextPlayingVideo !== null) {
      setCurrentPlayingVideo(nextPlayingVideo);
    }
  };
  return (
    <div className='flex justify-between my-5 px-[15%] shrink-0'>
      <Button
        onClick={() => controllerClickHandler('prev')}
        disabled={prevPlayingVideo === null}
        id='prev-controller'
        className={`w-44 h-12 flex justify-between items-center gap-3 font-bold text-lg ${
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
        className={`w-44 h-12 flex justify-between items-center gap-3 font-bold text-lg ${
          nextPlayingVideo === null ? 'opacity-50 hover:opacity-50' : ''
        }`}
      >
        <div>다음 강의</div>
        <div>〉</div>
      </Button>
    </div>
  );
}
