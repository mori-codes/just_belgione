import { useEffect, useRef, useState } from 'react';
import { useLocalization } from '../../../atoms/localizationAtom';
import {
  pointsDisplayVariants,
  pointsDisplayVariantsLabels,
} from './PointsDisplay.animations';
import { AnimatePresence, motion } from 'framer-motion';

type Props = { points: number; correct: boolean };
const PointsDisplay = ({ points, correct }: Props) => {
  const { stringTable } = useLocalization();
  const [displayNumber, setDisplayNumber] = useState(points);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      correct && setDisplayNumber(points + 1);
    }, 500);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [correct, points]);
  
  return (
    <motion.p className="overflow-visible flex gap-1">
      {stringTable.POINTS}:
      <AnimatePresence mode="wait">
        <motion.span
          className="w-[20px] text-right"
          key={displayNumber}
          variants={pointsDisplayVariants}
          initial={
            correct
              ? points !== displayNumber
                ? pointsDisplayVariantsLabels.entering
                : undefined
              : pointsDisplayVariantsLabels.incorrect
          }
          animate={
            correct
              ? points !== displayNumber
                ? pointsDisplayVariantsLabels.correct
                : undefined
              : { color: '#121212', transition: { duration: 2 } }
          }
          exit={pointsDisplayVariantsLabels.going}
        >
          {displayNumber}{' '}
        </motion.span>
      </AnimatePresence>
      <span className={correct ? 'text-jo-green' : 'text-jo-red'}>
        {correct ? '+1' : '+0'}
      </span>
    </motion.p>
  );
};

export { PointsDisplay };
