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
    <div className='flex flex-col gap-2'>
      {mode === 'question' ? (
        <>
          <div className='flex items-center justify-between border-b-2 border-b-sroom-white'>
            <p className='text-xs text-sroom-gray-100'>
              {wrongQuiz.video_title}
            </p>
            <Button
              onClick={toggleModeHandler}
              className='h-5 border !rounded-full w-16 bg-sroom-white text-sroom-brand
               mb-1'
            >
              정답보기
            </Button>
          </div>
          <p className='flex items-center text-xs font-medium break-keep md:text-sm xl:text-base text-sroom-white'>
            {`Q. ${wrongQuiz.quiz_question}`}
          </p>
        </>
      ) : mode === 'answer' ? (
        <>
          <div className='flex items-center justify-between border-b-2 border-b-sroom-white'>
            <p className='text-xs text-sroom-gray-100'>
              {getRelativeTime(wrongQuiz.submitted_at)}
            </p>
            <Button
              onClick={toggleModeHandler}
              className='h-5 border !rounded-full w-16 bg-sroom-white text-sroom-brand
               mb-1'
            >
              문제보기
            </Button>
          </div>
          <p className='flex items-center text-xs font-medium break-keep md:text-sm xl:text-base text-sroom-white'>
            {`A. ${wrongQuiz.quiz_answer}`}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
