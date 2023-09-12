export default function TrueOrFalse({
  quiz,
  id,
  selectedAnswer,
  trueOrFalseHandler
}: {
  quiz: Quiz;
  id: number;
  selectedAnswer: SelectedQuizAnswer;
  trueOrFalseHandler: (inputtedAnswer: string) => void;
}) {
  const isSubmitted = quiz.is_submitted;

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
            selectedAnswer.submitted_answer === 'true'
              ? 'text-sroom-black-400'
              : isSubmitted && quiz.answer === 'true'
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
            selectedAnswer.submitted_answer === 'false'
              ? 'text-sroom-black-400'
              : isSubmitted && quiz.answer === 'false'
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
