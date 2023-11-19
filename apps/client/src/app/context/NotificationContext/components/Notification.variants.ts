import { Variants } from 'framer-motion';

const notificationVariantsKeys = {
  initial: 'initial',
  visible: 'visible',
  exit: 'exit',
};

const notificationVariants: Variants = {
  [notificationVariantsKeys.initial]: {
    opacity: 0,
    y: -300,
  },
  [notificationVariantsKeys.visible]: {
    y: 0,
    opacity: 1,
  },
  [notificationVariantsKeys.exit]: {
    opacity: 0,
  },
};

export { notificationVariants, notificationVariantsKeys };
