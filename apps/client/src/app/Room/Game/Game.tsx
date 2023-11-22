import {
  ClientMessage,
  Player,
  Round,
  ServerMessage,
} from '@just-belgione/types';
import { useEffect, useState } from 'react';
import { useUser } from '../../atoms/userAtom';
import { PlayerGuessing } from './PlayerGuessing/PlayerGuessing';
import { PlayerNotGuessing } from './PlayerNotGuessing/PlayerNotGuessing';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '../../context/NotificationContext';
import RoundResult from './RoundResult/RoundResult';

type Props = {
  players: Player[];
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
};

const Game: React.FC<Props> = ({ players, lastJsonMessage, sendMessage }) => {
  const [user] = useUser();
  const [state, setState] = useState<Round>();
  const iAmGuessing = state?.playerGuessing === user;
  const navigate = useNavigate();
  const { enqueueError } = useNotificationContext();

  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage?.type !== 'newRound') return;
    setState(lastJsonMessage.data.round);
  }, [lastJsonMessage]);

  // Handle invalid room error
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'invalidGameError') {
      enqueueError(lastJsonMessage.data.message);
      navigate('/');
    }
  }, [enqueueError, lastJsonMessage, navigate]);

  if (lastJsonMessage.type === 'roundResult') {
    const { guess, correct, gamePoints, roundIndex, wordToGuess } =
      lastJsonMessage.data;
    return (
      <RoundResult
        guess={guess}
        correctWord={wordToGuess}
        correct={correct}
        roundIndex={roundIndex}
        points={gamePoints}
        playerGuessing={iAmGuessing}
        sendMessage={sendMessage}
      />
    );
  }

  return iAmGuessing ? (
    <PlayerGuessing
      lastJsonMessage={lastJsonMessage}
      sendMessage={sendMessage}
    />
  ) : (
    <PlayerNotGuessing
      wordToGuess={state?.wordToGuess || ''}
      sendMessage={sendMessage}
      lastJsonMessage={lastJsonMessage}
      players={players}
    />
  );
};

export { Game };
