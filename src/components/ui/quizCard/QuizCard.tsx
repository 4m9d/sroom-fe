'use client';
import MultipleChoiceSVG from '@/public/icon/MultipleChoice';
import { useRef } from 'react';

type Props = {
  selectedAnswerList: SelectedQuizAnswer[];
  setSelectedAnswerList: React.Dispatch<
    React.SetStateAction<SelectedQuizAnswer[]>
  >;
  quiz: Quiz;
  questionNumber: number;
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
  questionNumber
}: Props) {
  const previouslySelectedAnswer = selectedAnswerList.find(
    (answer) => answer.id === quiz.id
  );
  const selectedAnswer = useRef<SelectedQuizAnswer>(
    previouslySelectedAnswer ?? {
      id: quiz.id,
      submitted_answer: ''
    }
  );

  const updateSelectedAnswerList = () => {
    setSelectedAnswerList((prev) => {
      const filtered = prev.filter((prevAnswer) => prevAnswer.id !== quiz.id);
      return [...filtered, selectedAnswer.current];
    });
  };

  const multipleChoiceHandler = (index: string) => {
    selectedAnswer.current = {
      id: quiz.id,
      submitted_answer: index
    };

    updateSelectedAnswerList();
  };

  const shortAnswerHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      id: quiz.id,
      submitted_answer: inputtedAnswer
    };

    updateSelectedAnswerList();
  };

  const trueOrFalseHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      id: quiz.id,
      submitted_answer: inputtedAnswer
    };

    updateSelectedAnswerList();
  };

  return (
    <article className='w-full px-2 text-sroom-black-400'>
      <p className='mb-4 font-bold px-9 -indent-9 whitespace-break-spaces'>
        <span className='mr-[0.65rem] text-lg'>{`Q.${questionNumber}`}</span>
        {quiz.question}
      </p>
      {quiz.type === QuizType.MULTIPLE_CHOICE && (
        <div className='flex flex-col gap-5 px-5 py-3 border border-sroom-gray-500'>
          {quiz.options.map((option, index) => {
            return (
              <div
                key={`quiz-${quiz.id}-${index + 1}`}
                className='flex items-start w-full'
              >
                <input
                  type='radio'
                  name={`quiz-${quiz.id}`}
                  id={`quiz-${quiz.id}-multiple-${index + 1}`}
                  className='hidden'
                  onChange={() => multipleChoiceHandler((index + 1).toString())}
                />
                <button
                  type='button'
                  className='mr-2'
                  onClick={() => multipleChoiceHandler((index + 1).toString())}
                >
                  <MultipleChoiceSVG
                    selected={
                      selectedAnswer.current.submitted_answer ===
                      (index + 1).toString()
                    }
                  />
                </button>
                <label
                  htmlFor={`quiz-${quiz.id}-multiple-${index + 1}`}
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
          defaultValue={selectedAnswer.current.submitted_answer ?? ''}
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
                selectedAnswer.current.submitted_answer === 'true'
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
                selectedAnswer.current.submitted_answer === 'false'
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
