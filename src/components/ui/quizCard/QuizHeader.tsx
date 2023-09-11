'use client';
import CorrectCheckSVG from '@/public/icon/CorrectCheck';
import WrongCheckSVG from '@/public/icon/WrongCheck';
import { QuizType } from '@/src/constants/materials/materials';
import { AnimatePresence, motion } from 'framer-motion';

export default function QuizHeader({
  type,
  courseVideoId,
  isCorrect,
  isSubmitted,
  questionNumber,
  question
}: {
  type: 1 | 2 | 3;
  courseVideoId: number;
  isCorrect: boolean;
  isSubmitted: boolean;
  questionNumber: number;
  question: string;
}) {
  const correctAnimationConfig = {
    initial: { opacity: 0, y: 3 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, delay: 0.2 }
  };
  const wrongAnimationConfig = {
    initial: { x: 0 },
    animate: { x: [-3, 3, -3, 0] },
    transition: {
      duration: 0.2,
      delay: 0.2
    }
  };
  return (
    <>
      <div className='flex items-end mb-4 font-bold'>
        {isSubmitted && type !== QuizType.SHORT_ANSWER && (
          <p
            className={`flex flex-col mr-2 text-xs items-center ${
              isCorrect ? 'text-sroom-green' : 'text-sroom-red'
            }`}
          >
            <AnimatePresence>
              <motion.span
                key={`quiz-${courseVideoId}-${questionNumber}-isCorrect`}
                {...(isCorrect ? correctAnimationConfig : wrongAnimationConfig)}
              >
                {isCorrect ? '정답' : '오답'}
              </motion.span>
              <motion.span
                key={`quiz-${courseVideoId}-${questionNumber}-check`}
                {...(isCorrect ? correctAnimationConfig : wrongAnimationConfig)}
              >
                {isCorrect ? <CorrectCheckSVG /> : <WrongCheckSVG />}
              </motion.span>
            </AnimatePresence>
          </p>
        )}
        <div>
          <span className='mr-2 text-lg'>{`Q.${questionNumber}`}</span>
          <span>{question}</span>
        </div>
      </div>
    </>
  );
}
