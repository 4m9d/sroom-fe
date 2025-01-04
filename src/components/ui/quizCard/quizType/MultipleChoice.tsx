import { MultipleChoiceSVG } from '@/public/icons/icons';

export default function MultipleChoice({
  quiz,
  selectedAnswer,
  multipleChoiceHandler
}: {
  quiz: Quiz;
  selectedAnswer: SelectedQuizAnswer;
  multipleChoiceHandler: (index: string) => void;
}) {
  return (
    <div className='flex flex-col gap-2 px-5 py-2 border border-sroom-gray-500'>
      {quiz.options.map((option, index) => {
        const currIndex = (index + 1).toString();
        const isSubmitted = selectedAnswer?.is_submitted;
        const isAnswer = quiz.answer === currIndex;
        const isWrong = isSubmitted && selectedAnswer.is_correct === false;
        const isSelected = selectedAnswer?.submitted_answer === currIndex;

        return (
          <div
            key={`quiz-${quiz.id}-${currIndex}`}
            className={`flex items-start w-full p-2 ${
              isWrong && isAnswer ? 'bg-sroom-brand' : 'bg-sroom-white'
            }`}
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
                isAnswer={isSubmitted && isAnswer}
                selected={isSelected}
              />
            </button>
            <label
              htmlFor={`quiz-${quiz.id}-multiple-${currIndex}`}
              className={`w-full break-all cursor-pointer ${
                isSelected
                  ? 'text-sroom-black-400 font-bold'
                  : isWrong && isAnswer
                  ? 'text-sroom-white font-normal'
                  : 'text-sroom-black-300 font-normal'
              }`}
            >
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}
