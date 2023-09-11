'use client';
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
                quiz={quiz}
                questionNumber={idx + 1}
              />
            </motion.section>
          );
        })}
      </div>
    </AnimatePresence>
  );
}
