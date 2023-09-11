'use client';
import { useRef } from 'react';
import TrueOrFalse from './quizType/TrueOrFalse';
import ShortAnswer from './quizType/ShortAnswer';
import MultipleChoice from './quizType/MultipleChoice';
import QuizHeader from './QuizHeader';

type Props = {
  selectedAnswerList: SelectedQuizAnswer[];
  setSelectedAnswerList: React.Dispatch<
    React.SetStateAction<SelectedQuizAnswer[]>
  >;
  quiz: Quiz;
  questionNumber: number;
  isCorrect: boolean | undefined;
  isScrapped: boolean | undefined;
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
  questionNumber,
  isCorrect,
  isScrapped
}: Props) {
  const previouslySelectedAnswer = selectedAnswerList.find(
    (answer) => answer.id === quiz.id
  );

  const isSubmitted = isCorrect !== undefined;

  const selectedAnswer = useRef<SelectedQuizAnswer>(
    previouslySelectedAnswer ?? {
      id: quiz.id,
      submitted_answer: '',
      is_correct: isCorrect,
      is_scrapped: isScrapped
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
      submitted_answer: index,
      is_correct: isCorrect,
      is_scrapped: isScrapped
    };

    updateSelectedAnswerList();
  };

  const shortAnswerHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      id: quiz.id,
      submitted_answer: inputtedAnswer.trim(),
      is_correct: isCorrect,
      is_scrapped: isScrapped
    };

    updateSelectedAnswerList();
  };

  const trueOrFalseHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      id: quiz.id,
      submitted_answer: inputtedAnswer,
      is_correct: isCorrect,
      is_scrapped: isScrapped
    };

    updateSelectedAnswerList();
  };

  return (
    <article className='w-full px-2 text-sroom-black-400'>
      <QuizHeader
        isCorrect={isCorrect}
        question={quiz.question}
        questionNumber={questionNumber}
      />
      {quiz.type === QuizType.MULTIPLE_CHOICE && (
        <MultipleChoice
          quiz={quiz}
          isSubmitted={isSubmitted}
          multipleChoiceHandler={multipleChoiceHandler}
          selectedAnswer={selectedAnswer}
        />
      )}
      {quiz.type === QuizType.SHORT_ANSWER && (
        <ShortAnswer
          isSubmitted={isSubmitted}
          shortAnswerHandler={shortAnswerHandler}
          selectedAnswer={selectedAnswer}
        />
      )}
      {quiz.type === QuizType.TRUE_OR_FALSE && (
        <TrueOrFalse
          id={quiz.id}
          isSubmitted={isSubmitted}
          trueOrFalseHandler={trueOrFalseHandler}
          selectedAnswer={selectedAnswer}
        />
      )}
    </article>
  );
}
