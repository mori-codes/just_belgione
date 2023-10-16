import { Variants } from 'framer-motion';

const appearingButtonVariantsLabels = {
    hidden: 'hidden',
    visible: 'visible',
} as const

const appearingButtonVariants: Variants = {
    [appearingButtonVariantsLabels.hidden]: {
        opacity: 0,
        scale: 0,
    },
    [appearingButtonVariantsLabels.visible]: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5
        }
    },
};

export { appearingButtonVariants, appearingButtonVariantsLabels};
