import MultipleChoiceSVG from '@/public/icon/MultipleChoice';

export default function MultipleChoice({
  quiz,
  isSubmitted,
  multipleChoiceHandler,
  selectedAnswer
}: {
  quiz: Quiz;
  isSubmitted: boolean;
  multipleChoiceHandler: (index: string) => void;
  selectedAnswer: React.MutableRefObject<SelectedQuizAnswer>;
}) {
  return (
    <div className='flex flex-col gap-5 px-5 py-3 border border-sroom-gray-500'>
      {quiz.options.map((option, index) => {
        const currIndex = (index + 1).toString();
        return (
          <div
            key={`quiz-${quiz.id}-${currIndex}`}
            className='flex items-start w-full'
          >
            <input
              type='radio'
              disabled={isSubmitted}
              name={`quiz-${quiz.id}`}
              id={`quiz-${quiz.id}-multiple-${currIndex}`}
              className='hidden'
              onChange={() =>
                isSubmitted === false && multipleChoiceHandler(currIndex)
              }
            />
            <button
              type='button'
              className='mr-2'
              onClick={() =>
                isSubmitted === false && multipleChoiceHandler(currIndex)
              }
            >
              <MultipleChoiceSVG
                selected={selectedAnswer.current.submitted_answer === currIndex}
              />
            </button>
            <label
              htmlFor={`quiz-${quiz.id}-multiple-${currIndex}`}
              className='w-full break-all cursor-pointer'
            >
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}
