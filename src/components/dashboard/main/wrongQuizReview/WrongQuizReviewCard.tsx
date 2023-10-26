'use client';
import Button from '@/src/components/ui/button/Button';
import getRelativeTime from '@/src/util/time/getRelativeTime';
import { useState } from 'react';

type Props = {
  wrongQuiz: WrongQuiz;
};

export default function WrongQuizReviewCard({ wrongQuiz }: Props) {
  const [mode, setMode] = useState<'question' | 'answer'>('question');

  const toggleModeHandler = () => {
    setMode((prev) => (prev === 'question' ? 'answer' : 'question'));
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      {mode === 'question' ? (
        <>
          <div className='items-center justify-between hidden border-b-2 sm:flex border-b-sroom-white'>
            <p className='text-xs text-sroom-gray-100'>
              {wrongQuiz.video_title}
            </p>
            <Button
              onClick={toggleModeHandler}
              className='h-5 border !rounded-full w-16 bg-sroom-white text-sroom-brand
               mb-1 text-xs'
            >
              정답보기
            </Button>
          </div>
          <p className='w-full text-xs font-medium whitespace-normal break-keep md:text-sm xl:text-base text-sroom-white line-clamp-1 md:line-clamp-none'>
            {`Q. ${wrongQuiz.quiz_question}`}
          </p>
        </>
      ) : mode === 'answer' ? (
        <>
          <div className='items-center justify-between hidden border-b-2 sm:flex border-b-sroom-white'>
            <p className='text-xs text-sroom-gray-100'>
              {getRelativeTime(wrongQuiz.submitted_at)}
            </p>
            <Button
              onClick={toggleModeHandler}
              className='h-5 border !rounded-full w-16 bg-sroom-white text-sroom-brand
               mb-1 text-xs'
            >
              문제보기
            </Button>
          </div>
          <p className='text-xs font-medium whitespace-normal break-keep md:text-sm xl:text-base text-sroom-white line-clamp-1 md:line-clamp-none'>
            {`A. ${wrongQuiz.quiz_answer}`}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
