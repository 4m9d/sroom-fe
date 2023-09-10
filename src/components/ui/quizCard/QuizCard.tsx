'use client';
import MultipleChoiceSVG from '@/public/icon/MultipleChoice';
import { useState } from 'react';

type Props = {
  selectedAnswerList: SelectedQuizAnswer[];
  setSelectedAnswerList: React.Dispatch<
    React.SetStateAction<SelectedQuizAnswer[]>
  >;
  quiz: Quiz;
  idx: number;
};
const QuizType = {
  MULTIPLE_CHOICE: 1,
  SHORT_ANSWER: 2,
  TRUE_OR_FALSE: 3
} as const;

export default function QuizCard({
  selectedAnswerList,
  setSelectedAnswerList,
  quiz,
  idx
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedQuizAnswer>({
    id: quiz.id,
    submitted_answer: null
  });

  const updateSelectedAnswerList = () => {
    setSelectedAnswerList((prev) => {
      const filtered = prev.filter((prevAnswer) => prevAnswer.id !== quiz.id);
      return [...filtered, selectedAnswer];
    });
  };

  const multipleChoiceHandler = (option: string) => {
    setSelectedAnswer(() => {
      return {
        id: quiz.id,
        submitted_answer: option
      };
    });

    updateSelectedAnswerList();
  };

  const shortAnswerHandler = (inputtedAnswer: string) => {
    setSelectedAnswer(() => {
      return {
        id: quiz.id,
        submitted_answer: inputtedAnswer
      };
    });

    updateSelectedAnswerList();
  };

  const trueOrFalseHandler = (inputtedAnswer: string) => {
    setSelectedAnswer(() => {
      return {
        id: quiz.id,
        submitted_answer: inputtedAnswer
      };
    });

    updateSelectedAnswerList();
  }

  return (
    <article className='w-full px-2 text-sroom-black-400'>
      <p className='mb-4 font-bold px-9 -indent-9 whitespace-break-spaces'>
        <span className='mr-[0.65rem] text-lg'>{`Q.${idx}`}</span>
        {quiz.question}
      </p>
      {quiz.type === QuizType.MULTIPLE_CHOICE && (
        <div className='flex flex-col gap-5 px-5 py-3 border border-sroom-gray-500'>
          {quiz.options.map((option, idx) => {
            return (
              <div
                key={`quiz-${quiz.id}-${idx}`}
                className='flex items-start w-full'
              >
                <input
                  type='radio'
                  name={`quiz-${quiz.id}`}
                  id={`quiz-${quiz.id}-multiple-${idx}`}
                  className='hidden'
                  onChange={() => multipleChoiceHandler(option)}
                />
                <button
                  type='button'
                  className='mr-2'
                  onClick={() => multipleChoiceHandler(option)}
                >
                  <MultipleChoiceSVG
                    selected={selectedAnswer.submitted_answer === option}
                  />
                </button>
                <label
                  htmlFor={`quiz-${quiz.id}-multiple-${idx}`}
                  className='w-full break-all cursor-pointer'
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      )}
      {quiz.type === QuizType.SHORT_ANSWER && (
        <textarea
          className='w-full !h-40 p-3 border rounded-none resize-none textarea border-sroom-gray-500'
          placeholder='정답을 입력해 주세요.'
          onChange={(e) => shortAnswerHandler(e.target.value)}
        />
      )}
      {quiz.type === QuizType.TRUE_OR_FALSE && (
        <div className='flex items-center justify-between w-full h-20'>
          <input
            type='radio'
            name={`quiz-${quiz.id}`}
            id={`quiz-${quiz.id}-true`}
            className='hidden'
            onChange={() => trueOrFalseHandler('true')}
          />
          <button
            type='button'
            onClick={() => trueOrFalseHandler('true')}
            className='flex items-center justify-center flex-1'
          >
            <label
              htmlFor={`quiz-${quiz.id}-true`}
              className={`text-2xl font-bold cursor-pointer ${
                selectedAnswer.submitted_answer === 'true'
                  ? 'text-sroom-black-400'
                  : 'text-sroom-gray-500'
              }`}
            >
              {'TRUE'}
            </label>
          </button>
          <div className='w-[1px] h-full bg-sroom-gray-500' />
          <input
            type='radio'
            name={`quiz-${quiz.id}`}
            id={`quiz-${quiz.id}-false`}
            className='hidden'
            onChange={() => trueOrFalseHandler('false')}
          />
          <button
            type='button'
            onClick={() => trueOrFalseHandler('false')}
            className='flex items-center justify-center flex-1'
          >
            <label
              htmlFor={`quiz-${quiz.id}-false`}
              className={`text-2xl font-bold cursor-pointer ${
                selectedAnswer.submitted_answer === 'false'
                  ? 'text-sroom-black-400'
                  : 'text-sroom-gray-500'
              }`}
            >
              {'FALSE'}
            </label>
          </button>
        </div>
      )}
    </article>
  );
}
