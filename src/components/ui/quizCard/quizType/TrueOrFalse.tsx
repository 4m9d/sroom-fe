export default function TrueOrFalse({
  quiz,
  id,
  isSubmitted,
  trueOrFalseHandler,
  selectedAnswer
}: {
  quiz: Quiz;
  id: number;
  isSubmitted: boolean;
  trueOrFalseHandler: (inputtedAnswer: string) => void;
  selectedAnswer: React.MutableRefObject<SelectedQuizAnswer>;
}) {
  const isAnswer = isSubmitted && quiz.answer !== selectedAnswer.current.submitted_answer;

  return (
    <div className='flex items-center justify-between w-full h-20'>
      <input
        type='radio'
        name={`quiz-${id}`}
        id={`quiz-${id}-true`}
        className='hidden'
        onChange={() => isSubmitted === false && trueOrFalseHandler('true')}
      />
      <button
        type='button'
        disabled={isSubmitted}
        onClick={() => isSubmitted === false && trueOrFalseHandler('true')}
        className='flex items-center justify-center flex-1'
      >
        <label
          htmlFor={`quiz-${id}-true`}
          className={`text-2xl font-bold cursor-pointer ${
            selectedAnswer.current.submitted_answer === 'true'
              ? 'text-sroom-black-400'
              : isAnswer
              ? 'text-sroom-brand'
              : 'text-sroom-gray-500'
          }`}
        >
          {'TRUE'}
        </label>
      </button>
      <div className='w-[1px] h-full bg-sroom-gray-500' />
      <input
        type='radio'
        name={`quiz-${id}`}
        id={`quiz-${id}-false`}
        className='hidden'
        onChange={() => isSubmitted === false && trueOrFalseHandler('false')}
      />
      <button
        type='button'
        disabled={isSubmitted}
        onClick={() => isSubmitted === false && trueOrFalseHandler('false')}
        className='flex items-center justify-center flex-1'
      >
        <label
          htmlFor={`quiz-${id}-false`}
          className={`text-2xl font-bold cursor-pointer ${
            selectedAnswer.current.submitted_answer === 'false'
              ? 'text-sroom-black-400'
              : isAnswer
              ? 'text-sroom-brand'
              : 'text-sroom-gray-500'
          }`}
        >
          {'FALSE'}
        </label>
      </button>
    </div>
  );
}
