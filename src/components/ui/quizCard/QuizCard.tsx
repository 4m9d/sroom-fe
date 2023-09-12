'use client';
import { useRef, useState } from 'react';
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
  quiz: Quiz;
  selectedAnswer: SelectedQuizAnswer;
  questionNumber: number;
  courseVideoId: number;
};

export default function QuizCard({
  selectedAnswerList,
  setSelectedAnswerList,
  quiz,
  selectedAnswer,
  questionNumber,
  courseVideoId
}: Props) {
  const updateSelectedAnswerList = (selectedAnswer: SelectedQuizAnswer) => {
    setSelectedAnswerList((prev) => {
      const filtered = prev.filter((prevAnswer) => prevAnswer.id !== quiz.id);
      return [...filtered, selectedAnswer];
    });
  };

  const multipleChoiceHandler = (index: string) => {
    const updatedAnswer = {
      ...selectedAnswer,
      submitted_answer: index
    };
    updateSelectedAnswerList(updatedAnswer);
  };

  const shortAnswerHandler = (inputtedAnswer: string) => {
    const updatedAnswer = {
      ...selectedAnswer,
      submitted_answer: inputtedAnswer.trim()
    };
    updateSelectedAnswerList(updatedAnswer);
  };

  const trueOrFalseHandler = (inputtedAnswer: string) => {
    const updatedAnswer = {
      ...selectedAnswer,
      submitted_answer: inputtedAnswer.trim()
    };
    updateSelectedAnswerList(updatedAnswer);
  };

  const quizScrapHandler = () => {
    const updatedAnswer = {
      ...selectedAnswer,
      is_scrapped: !quiz.is_scrapped
    };
    updateSelectedAnswerList(updatedAnswer);
  };

  return (
    <article className='w-full px-2 text-sroom-black-400'>
      <QuizHeader
        quiz={quiz}
        selectedAnswer={selectedAnswer}
        type={quiz.type}
        courseVideoId={courseVideoId}
        question={quiz.question}
        questionNumber={questionNumber}
      />
      {quiz.type === QuizType.MULTIPLE_CHOICE && (
        <MultipleChoice
          quiz={quiz}
          selectedAnswer={selectedAnswer}
          multipleChoiceHandler={multipleChoiceHandler}
        />
      )}
      {quiz.type === QuizType.SHORT_ANSWER && (
        <ShortAnswer
          quiz={quiz}
          selectedAnswer={selectedAnswer}
          shortAnswerHandler={shortAnswerHandler}
        />
      )}
      {quiz.type === QuizType.TRUE_OR_FALSE && (
        <TrueOrFalse
          quiz={quiz}
          selectedAnswer={selectedAnswer}
          id={quiz.id}
          trueOrFalseHandler={trueOrFalseHandler}
        />
      )}
      {quiz.is_submitted && (
        <Button
          onClick={() => quizScrapHandler()}
          className={`w-full mt-4 py-7 ${
            quiz.is_scrapped
              ? 'text-sroom-black-200 bg-sroom-gray-300'
              : 'text-sroom-black-400 bg-sroom-white border border-sroom-black-400'
          }`}
        >
          {quiz.is_scrapped ? '등록 취소' : '오답노트 등록'}
        </Button>
      )}
    </article>
  );
}
