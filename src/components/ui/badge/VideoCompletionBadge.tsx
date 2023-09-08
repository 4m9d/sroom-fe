'use cleint';
import { AnimatePresence, motion } from 'framer-motion';

export default function VideoCompletionBadge() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 100 }}
        className='flex shrink-0 justify-center items-center bg-sroom-black-100 text-sroom-white text-[0.6rem] font-semibold w-[30px] h-[17px]'
      >
        완료
      </motion.div>
    </AnimatePresence>
  );
}
