import { motion } from 'framer-motion';
import {
  notificationVariants,
  notificationVariantsKeys,
} from './Notification.variants';

type Props = {
  message: string;
  timeout: number;
  onNotificationDismiss: () => void;
};

const NotificationTimer = ({ timeout }: { timeout: number }) => {
  return (
    <motion.div
      className="h-1 w-full bg-jo-red"
      initial={{ scaleX: 0 }}
      animate={{
        scaleX: 1,
      }}
      transition={{
        duration: timeout / 1000,
      }}
    ></motion.div>
  );
};

const Notification = ({ message, timeout, onNotificationDismiss }: Props) => {
  return (
    <motion.div
      className="w-full max-w-[600px] mx-4 rounded-sm shadow-xl bg-white"
      drag="x"
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 200) {
          onNotificationDismiss();
        }
      }}
      variants={notificationVariants}
      initial={notificationVariantsKeys.initial}
      animate={notificationVariantsKeys.visible}
      exit={notificationVariantsKeys.exit}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="p-4 flex gap-4 items-center text-jo-sm text-jo-red">
        <div className="border-jo-red border-[6px] rounded-full h-16 w-16 flex justify-center items-center text-jo-lg shrink-0">
          F
        </div>
        {message}
      </div>
      <NotificationTimer timeout={timeout} />
    </motion.div>
  );
};

export { Notification };
