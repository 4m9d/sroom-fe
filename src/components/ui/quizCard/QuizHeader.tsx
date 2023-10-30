'use client';
import CorrectCheckSVG from '@/public/icon/CorrectCheck';
import WrongCheckSVG from '@/public/icon/WrongCheck';
import { QuizType } from '@/src/constants/courseTaking/courseTaking';
import { AnimatePresence, motion } from 'framer-motion';

export default function QuizHeader({
  quiz,
  selectedAnswer,
  type,
  courseVideoId,
  questionNumber,
  question
}: {
  quiz: Quiz;
  selectedAnswer: SelectedQuizAnswer;
  type: 1 | 2 | 3;
  courseVideoId: number;
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
  const isSubmitted = selectedAnswer?.is_submitted;
  return (
    <>
      <div className='flex items-start mb-4 font-bold'>
        {isSubmitted && type !== QuizType.SHORT_ANSWER && (
          <p
            className={`flex flex-col mr-2 text-xs items-center -mt-4 ${
              selectedAnswer.is_correct ? 'text-sroom-green' : 'text-sroom-red'
            }`}
          >
            <AnimatePresence>
              <motion.span
                key={`quiz-${courseVideoId}-${questionNumber}-isCorrect`}
                {...(selectedAnswer.is_correct
                  ? correctAnimationConfig
                  : wrongAnimationConfig)}
              >
                {selectedAnswer.is_correct ? '정답' : '오답'}
              </motion.span>
              <motion.span
                key={`quiz-${courseVideoId}-${questionNumber}-check`}
                {...(selectedAnswer.is_correct
                  ? correctAnimationConfig
                  : wrongAnimationConfig)}
              >
                {selectedAnswer.is_correct ? (
                  <CorrectCheckSVG />
                ) : (
                  <WrongCheckSVG />
                )}
              </motion.span>
            </AnimatePresence>
          </p>
        )}
        <div className='flex items-start h-full'>
          <p className='mr-2 text-lg'>{`Q.${questionNumber}`}</p>
          <p className='text-lg'>{question}</p>
        </div>
      </div>
    </>
  );
}
