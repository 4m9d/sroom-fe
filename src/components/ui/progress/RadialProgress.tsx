'use client';
import { AnimatePresence, AnimationControls, motion } from 'framer-motion';

type Props = {
  className?: string;
  innerTextClassName?: string;
  value: number;
  size?: string;
};

export default function RadialProgress({
  className,
  innerTextClassName,
  value,
  size
}: Props) {
  const style = { '--value': 0, '--size': size } as React.CSSProperties;
  const animateStyle = { '--value': value } as unknown as AnimationControls;

  return (
    <AnimatePresence>
      <motion.div
        className={`${className} radial-progress radial-square`}
        style={style}
        animate={animateStyle}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className={`${innerTextClassName}`}>{value}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
