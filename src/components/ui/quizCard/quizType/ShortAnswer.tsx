export default function ShortAnswer({
  isSubmitted,
  shortAnswerHandler,
  selectedAnswer
}: {
  isSubmitted: boolean;
  shortAnswerHandler: (inputtedAnswer: string) => void;
  selectedAnswer: React.MutableRefObject<SelectedQuizAnswer>;
}) {
  return (
    <textarea
      className='w-full !h-40 p-3 border rounded-none resize-none textarea border-sroom-gray-500'
      placeholder='정답을 입력해 주세요.'
      disabled={isSubmitted}
      onChange={(e) =>
        isSubmitted === false && shortAnswerHandler(e.target.value)
      }
      defaultValue={selectedAnswer.current.submitted_answer ?? ''}
    />
  );
}
