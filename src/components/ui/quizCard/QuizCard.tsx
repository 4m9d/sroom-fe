'use client';
import { useRef } from 'react';
import TrueOrFalse from './quizType/TrueOrFalse';
import ShortAnswer from './quizType/ShortAnswer';
import MultipleChoice from './quizType/MultipleChoice';
import QuizHeader from './QuizHeader';
import Button from '../button/Button';
import { QuizType } from '@/src/constants/materials/materials';

type Props = {
  selectedAnswerList: SelectedQuizAnswer[];
  setSelectedAnswerList: React.Dispatch<
    React.SetStateAction<SelectedQuizAnswer[]>
  >;
  isCorrect: boolean;
  isScrapped: boolean;
  isSubmitted: boolean;
  quiz: Quiz;
  questionNumber: number;
  courseVideoId: number;
};

export default function QuizCard({
  selectedAnswerList,
  setSelectedAnswerList,
  isCorrect,
  isScrapped,
  isSubmitted,
  quiz,
  questionNumber,
  courseVideoId
}: Props) {
  const selectedAnswer = useRef<SelectedQuizAnswer>(quiz);
  console.log(selectedAnswer.current);

  const updateSelectedAnswerList = () => {
    setSelectedAnswerList((prev) => {
      const filtered = prev.filter((prevAnswer) => prevAnswer.id !== quiz.id);
      return [...filtered, selectedAnswer.current];
    });
  };

  const multipleChoiceHandler = (index: string) => {
    selectedAnswer.current = {
      ...selectedAnswer.current,
      submitted_answer: index
    };

    updateSelectedAnswerList();
  };

  const shortAnswerHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      ...selectedAnswer.current,
      submitted_answer: inputtedAnswer.trim()
    };

    updateSelectedAnswerList();
  };

  const trueOrFalseHandler = (inputtedAnswer: string) => {
    selectedAnswer.current = {
      ...selectedAnswer.current,
      submitted_answer: inputtedAnswer
    };

    updateSelectedAnswerList();
  };

  const quizScrapHandler = () => {
    selectedAnswer.current = {
      ...selectedAnswer.current,
      is_scrapped: !isScrapped
    };

    updateSelectedAnswerList();
  };

  return (
    <article className='w-full px-2 text-sroom-black-400'>
      <QuizHeader
        quiz={quiz}
        type={quiz.type}
        courseVideoId={courseVideoId}
        isSubmitted={isSubmitted}
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
          quiz={quiz}
          isSubmitted={isSubmitted}
          shortAnswerHandler={shortAnswerHandler}
          selectedAnswer={selectedAnswer}
        />
      )}
      {quiz.type === QuizType.TRUE_OR_FALSE && (
        <TrueOrFalse
          quiz={quiz}
          id={quiz.id}
          isSubmitted={isSubmitted}
          trueOrFalseHandler={trueOrFalseHandler}
          selectedAnswer={selectedAnswer}
        />
      )}
      {isSubmitted && (
        <Button
          onClick={() => quizScrapHandler()}
          className={`w-full mt-4 py-7 ${
            isScrapped
              ? 'text-sroom-black-200 bg-sroom-gray-300'
              : 'text-sroom-black-400 bg-sroom-white border border-sroom-black-400'
          }`}
        >
          {isScrapped ? '등록 취소' : '오답노트 등록'}
        </Button>
      )}
    </article>
  );
}
