import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ id, className, children, onClose }: Props) {
  return (
    <AnimatePresence>
      <div className={'modal modal-open'}>
        <div onClick={onClose} className='modal-backdrop' />
        <motion.div
          id={id}
          key={id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          className={`px-12 py-7 modal-box min-w-[70vw] ${className}`}
        >
          <button
            onClick={onClose}
            className='absolute btn btn-sm btn-circle btn-ghost right-2 top-2'
          >
            ✕
          </button>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
