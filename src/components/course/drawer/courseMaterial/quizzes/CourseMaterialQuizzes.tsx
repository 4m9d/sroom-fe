'use client';
import Button from '@/src/components/ui/button/Button';
import QuizCard from '@/src/components/ui/quizCard/QuizCard';
import { SessionStorageKeys } from '@/src/constants/materials/materials';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = { quizzes: Quiz[]; courseVideoId: number };

export default function CourseMaterialQuizzes({
  quizzes,
  courseVideoId
}: Props) {
  const sessionStorageKey = `${SessionStorageKeys.QUIZZES_SELECTED_ANSWER}-${courseVideoId}`;
  const previouslySelectedAnswerList =
    sessionStorage.getItem(sessionStorageKey);

  const [selectedAnswerList, setSelectedAnswerList] = useState<
    SelectedQuizAnswer[]
  >(
    previouslySelectedAnswerList ? JSON.parse(previouslySelectedAnswerList) : []
  );

  const isSubmitButtonDisabled =
    selectedAnswerList.filter((answer) => answer.submitted_answer !== '')
      .length !== quizzes.length || selectedAnswerList[0].is_submitted === true;

  const gradeSelectedQuizzes = () => {
    const gradedQuizzes = selectedAnswerList.map((selectedAnswer) => {
      const quiz = quizzes.find((quiz) => quiz.id === selectedAnswer.id);
      if (!quiz) return;

      const isCorrect = quiz.answer === selectedAnswer.submitted_answer;

      return {
        ...selectedAnswer,
        is_correct: isCorrect,
        is_submitted: true
      };
    });
    return gradedQuizzes as SelectedQuizAnswer[];
  };

  const quizSubmitHandler = () => {
    const gradedQuizzes = gradeSelectedQuizzes();
    setSelectedAnswerList(() => gradedQuizzes);

    console.log(selectedAnswerList);
  };

  useEffect(() => {
    sessionStorage.setItem(
      sessionStorageKey,
      JSON.stringify(selectedAnswerList)
    );
  }, [sessionStorageKey, selectedAnswerList, courseVideoId]);

  return (
    <AnimatePresence>
      <div
        className={`w-full my-10 flex flex-col justify-center items-between gap-10`}
      >
        {quizzes.map((quiz, idx) => {
          const selectedAnswer = selectedAnswerList.find(
            (answer) => answer.id === quiz.id
          );
          return (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              key={quiz.id}
            >
              <QuizCard
                selectedAnswerList={selectedAnswerList}
                setSelectedAnswerList={setSelectedAnswerList}
                isCorrect={selectedAnswer?.is_correct}
                isScrapped={selectedAnswer?.is_scrapped}
                quiz={quiz}
                questionNumber={idx + 1}
              />
            </motion.section>
          );
        })}
        <Button
          onClick={quizSubmitHandler}
          disabled={isSubmitButtonDisabled}
          className={`w-full mt-2 border py-7 border-sroom-black-400 bg-sroom-white ${
            isSubmitButtonDisabled ? 'opacity-50' : ''
          }`}
        >
          {'제출하기'}
        </Button>
      </div>
    </AnimatePresence>
  );
}
