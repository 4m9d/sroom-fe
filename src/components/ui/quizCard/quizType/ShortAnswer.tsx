export default function ShortAnswer({
  quiz,
  selectedAnswer,
  shortAnswerHandler
}: {
  quiz: Quiz;
  selectedAnswer: SelectedQuizAnswer;
  shortAnswerHandler: (inputtedAnswer: string) => void;
}) {
  const isSubmitted = quiz.is_submitted;
  return (
    <>
      <textarea
        className='w-full !h-40 p-3 border rounded-none resize-none textarea border-sroom-gray-500'
        placeholder='정답을 입력해 주세요.'
        disabled={isSubmitted}
        onChange={(e) =>
          isSubmitted === false && shortAnswerHandler(e.target.value)
        }
        defaultValue={selectedAnswer.submitted_answer ?? ''}
      />
      {isSubmitted && (
        <div>
          <p className='text-sm font-medium text-sroom-brand'>{`정답 : ${quiz.answer}`}</p>
        </div>
      )}
    </>
  );
}
