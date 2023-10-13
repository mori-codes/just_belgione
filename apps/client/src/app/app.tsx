import React, { ChangeEvent, useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const SOCKER_URL = 'wss://just-belgiapi.deno.dev/upgrade';
console.log({ SOCKER_URL });
const SOCKET_CONNECTION_STATUS_MAPPING = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const App = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, lastMessage, readyState } =
    useWebSocket<string>(SOCKER_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<string>[]>(
    []
  );
  const connectionStatus = SOCKET_CONNECTION_STATUS_MAPPING[readyState];

  const handleMsgChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(value);
  };

  const onClick = () => {
    sendMessage(message);
  };

  // Update the history.
  useEffect(() => {
    if (!lastMessage) return;
    setMessageHistory((prev) => prev.concat(lastMessage));
  }, [lastMessage]);

  return (
    <div>
      <div>
        <pre>Connection status: {connectionStatus}</pre>
      </div>
      <div>
        <textarea
          rows={4}
          cols={50}
          onChange={handleMsgChange}
          value={message}
        />
      </div>
      <div>
        <button onClick={onClick} disabled={readyState !== ReadyState.OPEN}>
          Send
        </button>
      </div>
      <div>
        <pre>
          Last message: {lastMessage?.data || 'There are no new messages'}
        </pre>
        <pre>
          Message history:{' '}
          {JSON.stringify(
            messageHistory.map((message) => message.data).reverse(),
            null,
            4
          )}
        </pre>
      </div>
    </div>
  );
};

export default App;
