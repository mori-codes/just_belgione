import {
  ClientMessage,
  Hint,
  Player,
  ServerMessage,
  Word,
} from '@just-belgione/types';
import { useEffect, useState } from 'react';
import { useUser } from '../../../atoms/userAtom';
import { useParams } from 'react-router-dom';
import { SendHintScreen } from './SendHintScreen';
import { HintsPreview } from './HintsPreview';
import { WaitingForGuess } from './WaitingForGuess';

type Props = {
  wordToGuess: Word;
  players: Player[];
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
};

const PlayerNotGuessing: React.FC<Props> = ({
  wordToGuess,
  players,
  lastJsonMessage,
  sendMessage,
}) => {
  const [status, setStatus] = useState<
    'noHintProvided' | 'hintProvided' | 'allHintsProvided' | 'waitingForGuess'
  >('noHintProvided');
  const [hints, setHints] = useState<Hint[]>([]);
  const [user] = useUser();
  const { id: roomId } = useParams();

  useEffect(() => {
    if (lastJsonMessage?.type === 'hintReceived') {
      setHints(lastJsonMessage.data.hints);
    }

    if (lastJsonMessage?.type === 'finalHints') {
      setHints(lastJsonMessage.data.validHints);
      setStatus('waitingForGuess');
    }
  }, [lastJsonMessage, players]);

  const handleSend = (hint: Word) => {
    if (!roomId) return;
    sendMessage({
      type: 'sendHint',
      data: {
        hint,
        player: user,
        roomId,
      },
    });
    setStatus('hintProvided');
  };

  if (!roomId) return null;

  switch (status) {
    case 'noHintProvided':
      return (
        <SendHintScreen
          wordToGuess={wordToGuess}
          onSend={handleSend}
          playerIndex={players.findIndex((p) => p === user)}
        />
      );
    case 'hintProvided':
      return (
        <HintsPreview
          hints={hints}
          setHints={setHints}
          players={players}
          roomId={roomId}
          sendMessage={sendMessage}
        />
      );

    case 'allHintsProvided':
      return (
        <HintsPreview
          hints={hints}
          setHints={setHints}
          players={players}
          roomId={roomId}
          sendMessage={sendMessage}
        />
      );

    case 'waitingForGuess':
      if (lastJsonMessage.type !== 'finalHints') return 'Error';

      return (
        <WaitingForGuess
          hints={hints}
          playerGuessing={lastJsonMessage.data.playerGuessing}
        />
      );
  }
};

export { PlayerNotGuessing };
