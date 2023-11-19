import React, { createContext, useCallback, useState } from 'react';
import { NotificationInstance } from './NotificationContext.types';
import { NotificationContainer } from './components/NotificationContainer';

type NotificationContextValue = {
  enqueueError: (message: string) => void;
  removeNotification: () => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

const NotificationContextProvider = ({ children }: Props) => {
  const [currentNotification, setCurrentNotification] = useState<
    undefined | NotificationInstance
  >(undefined);

  const enqueueError = useCallback((message: string, timeoutMs = 5000) => {
    const id = Date.now();

    setCurrentNotification({
      id,
      message,
      timeout: timeoutMs,
    });

    setTimeout(
      () =>
        setCurrentNotification((prevNotification) =>
          prevNotification?.id === id ? undefined : prevNotification
        ),
      timeoutMs
    );
  }, []);

  const removeNotification = useCallback(() => {
    setCurrentNotification(undefined);
  }, []);

  return (
    <NotificationContext.Provider value={{ enqueueError, removeNotification }}>
      <NotificationContainer
        currentNotification={currentNotification}
        onNotificationDismiss={removeNotification}
      />
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const context = React.useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      'useNotificationContext must be used within a NotificationContextProvider'
    );
  }
  return context;
};

export { NotificationContextProvider, useNotificationContext };
