'use client';
import { updateCourseQuizGrade } from '@/src/api/materials/materials';
import { QueryKeys } from '@/src/api/queryKeys';
import Button from '@/src/components/ui/button/Button';
import QuizCard from '@/src/components/ui/quizCard/QuizCard';
import {
  QuizType,
  SessionStorageKeys
} from '@/src/constants/materials/materials';
import { ONE_SECOND_IN_MS } from '@/src/constants/time/time';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useState } from 'react';

type Props = { quizzes: Quiz[]; courseVideoId: number };
const DEBOUNCE_TIME = ONE_SECOND_IN_MS / 2;

export default function CourseMaterialQuizzes({
  quizzes,
  courseVideoId
}: Props) {
  const sessionStorageKey = `${SessionStorageKeys.QUIZZES_SELECTED_ANSWER}-${courseVideoId}`;

  const [selectedAnswerList, setSelectedAnswerList] =
    useState<SelectedQuizAnswer[]>(quizzes);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    [QueryKeys.QUiZ, courseVideoId.toString()],
    () => updateCourseQuizGradeMutation(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.COURSE_MATERIAL,
          courseVideoId.toString()
        ]);
      }
    }
  );

  const isSubmitButtonDisabled =
    selectedAnswerList.filter(
      (selectedAnswer) => selectedAnswer.submitted_answer !== null
    ).length !== quizzes.length ||
    selectedAnswerList.filter(
      (selectedAnswer) => selectedAnswer.submitted_answer === null
    ).length > 0;

  function gradeSelectedQuizzes() {
    const gradedQuizzes = selectedAnswerList.map((selectedAnswer) => {
      const quiz = quizzes.find((quiz) => quiz.id === selectedAnswer.id);

      const isCorrect = quiz?.answer === selectedAnswer.submitted_answer;

      return {
        ...selectedAnswer,
        is_correct: quiz?.type === QuizType.SHORT_ANSWER ? true : isCorrect,
        is_submitted: true
      };
    });
    return gradedQuizzes as SelectedQuizAnswer[];
  }

  function quizSubmitHandler() {
    const gradedQuizzes = gradeSelectedQuizzes();

    setSelectedAnswerList(() => gradedQuizzes);
    mutate();
  }

  async function updateCourseQuizGradeMutation() {
    const gradeResult = selectedAnswerList.map((selectedAnswer) => {
      return {
        id: selectedAnswer.id,
        submitted_answer: selectedAnswer.submitted_answer,
        is_correct: selectedAnswer.is_correct
      };
    }) as updateQuizGradeParams[];
    const result = await updateCourseQuizGrade(courseVideoId, gradeResult);
    return result;
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      sessionStorage.setItem(
        sessionStorageKey,
        JSON.stringify(selectedAnswerList)
      );
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounceTimer);
      if (
        selectedAnswerList.filter(
          (selectedAnswer) => selectedAnswer.is_submitted === true
        ).length === quizzes.length
      ) {
        sessionStorage.removeItem(sessionStorageKey);
      }
    };
  }, [sessionStorageKey, selectedAnswerList, courseVideoId, quizzes.length]);

  useLayoutEffect(() => {
    const previouslySelectedAnswerList =
      sessionStorage.getItem(sessionStorageKey);

    setSelectedAnswerList(() =>
      quizzes[0]?.is_submitted === false && previouslySelectedAnswerList
        ? JSON.parse(previouslySelectedAnswerList)
        : quizzes
    );
  }, [quizzes, sessionStorageKey]);
  return (
    <AnimatePresence>
      <div
        className={`min-w-full max-w-full my-10 flex flex-col justify-center items-between gap-10`}
      >
        {quizzes?.map((quiz, idx) => {
          const selectedAnswer = selectedAnswerList.find(
            (answer) => answer.id === quiz.id
          ) as SelectedQuizAnswer;

          return (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              key={quiz.id}
            >
              <QuizCard
                setSelectedAnswerList={setSelectedAnswerList}
                quiz={quiz}
                selectedAnswer={selectedAnswer}
                questionNumber={idx + 1}
                courseVideoId={courseVideoId}
              />
            </motion.section>
          );
        })}
        {selectedAnswerList[0].is_submitted === false && (
          <Button
            onClick={quizSubmitHandler}
            disabled={isSubmitButtonDisabled}
            className={`w-full mt-2 border py-7 border-sroom-black-400 bg-sroom-white ${
              isSubmitButtonDisabled ? 'opacity-50' : ''
            }`}
          >
            {'제출하기'}
          </Button>
        )}
      </div>
    </AnimatePresence>
  );
}
