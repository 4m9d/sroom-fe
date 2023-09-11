'use client';

import CorrectCheckSVG from '@/public/icon/CorrectCheck';
import WrongCheckSVG from '@/public/icon/WrongCheck';
import { AnimatePresence, motion } from 'framer-motion';

export default function QuizHeader({
  isCorrect,
  questionNumber,
  question
}: {
  isCorrect: boolean | undefined;
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
      <p className='flex items-end mb-4 font-bold'>
        {isCorrect !== undefined && (
          <div
            className={`flex flex-col mr-2 text-xs items-center ${
              isCorrect ? 'text-sroom-green' : 'text-sroom-red'
            }`}
          >
            <AnimatePresence>
              <motion.span
                {...(isCorrect ? correctAnimationConfig : wrongAnimationConfig)}
              >
                {isCorrect ? '정답' : '오답'}
              </motion.span>
              <motion.span
                {...(isCorrect ? correctAnimationConfig : wrongAnimationConfig)}
              >
                {isCorrect ? <CorrectCheckSVG /> : <WrongCheckSVG />}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
        <div>
          <span className='mr-2 text-lg'>{`Q.${questionNumber}`}</span>
          <span>{question}</span>
        </div>
      </p>
    </>
  );
}
