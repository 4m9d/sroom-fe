'use client';
import Button from '@/src/components/ui/button/Button';
import getRelativeTime from '@/src/util/time/getRelativeTime';

type Props = {
  wrongQuiz: WrongQuiz;
  mode: 'question' | 'answer';
  setMode: React.Dispatch<React.SetStateAction<'question' | 'answer'>>;
};
type ChildProps = {
  title: string;
  buttonLabel: string;
  description: string;
  mode: 'question' | 'answer';
  toggleModeHandler: () => void;
};

function WrongQuizContent({
  title,
  buttonLabel,
  description,
  mode,
  toggleModeHandler
}: ChildProps) {
  return (
    <>
      <div className='items-center justify-between hidden mb-1 border-b-2 sm:flex border-b-sroom-white'>
        <p className='text-xs whitespace-normal text-sroom-gray-100 line-clamp-1'>
          {title}
        </p>
        <Button
          onClick={toggleModeHandler}
          className={`h-[1.15rem] border !rounded-full w-16 bg-sroom-white mb-1 text-xs ${
            mode === 'question' ? 'text-sroom-brand' : 'text-sroom-black-200'
          }`}
        >
          {buttonLabel}
        </Button>
      </div>
      <p className='w-full text-xs font-medium whitespace-normal break-keep md:text-sm xl:text-base text-sroom-white line-clamp-1 md:line-clamp-none'>
        {description}
      </p>
    </>
  );
}

export default function WrongQuizReviewCard({
  wrongQuiz,
  mode,
  setMode
}: Props) {
  const toggleModeHandler = () => {
    setMode((prev) => (prev === 'question' ? 'answer' : 'question'));
  };

  return (
    <div className='flex flex-col justify-between flex-1'>
      {mode === 'question' ? (
        <WrongQuizContent
          title={wrongQuiz.video_title}
          buttonLabel='정답보기'
          description={`Q. ${wrongQuiz.quiz_question}`}
          mode={mode}
          toggleModeHandler={toggleModeHandler}
        />
      ) : mode === 'answer' ? (
        <WrongQuizContent
          title={getRelativeTime(wrongQuiz.submitted_at)}
          buttonLabel='문제보기'
          description={`A. ${wrongQuiz.quiz_answer}`}
          mode={mode}
          toggleModeHandler={toggleModeHandler}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
