import { AnimatePresence } from 'framer-motion';
import { NotificationInstance } from '../NotificationContext.types';
import { Notification } from './Notification';

type Props = {
  currentNotification: NotificationInstance | undefined;
  onNotificationDismiss: () => void;
};

const NotificationContainer = ({
  currentNotification,
  onNotificationDismiss,
}: Props) => {
  return (
    <div className="fixed w-full z-10 flex justify-center pt-8">
      <AnimatePresence>
        {currentNotification ? (
          <Notification
            key={currentNotification.id}
            message={currentNotification.message}
            timeout={currentNotification.timeout}
            onNotificationDismiss={onNotificationDismiss}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export { NotificationContainer };
