import { Variants } from 'framer-motion';

const pointsDisplayVariantsLabels = {
  going: 'going',
  entering: 'entering',
  correct: 'correct',
  incorrect: 'incorrect',
} as const;

const pointsDisplayVariants: Variants = {
  [pointsDisplayVariantsLabels.going]: {
    opacity: 0,
    y: 10,
  },
  [pointsDisplayVariantsLabels.entering]: {
    y: -10,
    opacity: 0,
  },
  [pointsDisplayVariantsLabels.correct]: {
    opacity: 1,
    y: 0,
    color: ['#121212', '#6CF869', '#121212'],
    transition: {
      ease: "easeOut",
    }
  },
  [pointsDisplayVariantsLabels.incorrect]: {
    color: '#F86969',
  },
};

export { pointsDisplayVariants, pointsDisplayVariantsLabels };
