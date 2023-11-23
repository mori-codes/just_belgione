import {
  ClientMessage,
  Player,
  Round,
  RoundResultMessage,
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
  const [round, setRound] = useState<Round>();
  const [roundResult, setRoundResult] = useState<RoundResultMessage['data']>();
  const iAmGuessing = round?.playerGuessing === user;
  const navigate = useNavigate();
  const { enqueueError } = useNotificationContext();

  useEffect(() => {
    if (lastJsonMessage.type === 'newRound') {
      setRound(lastJsonMessage.data.round);
    }

    if (lastJsonMessage.type === 'roundResult') {
      setRoundResult(lastJsonMessage.data);
    }
  }, [lastJsonMessage]);

  // Handle invalid room error
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'invalidGameError') {
      enqueueError(lastJsonMessage.data.message);
      navigate('/');
    }
  }, [enqueueError, lastJsonMessage, navigate]);

  if (roundResult !== undefined) {
    const { guess, correct, gamePoints, roundIndex, wordToGuess } = roundResult;
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
      wordToGuess={round?.wordToGuess || ''}
      sendMessage={sendMessage}
      lastJsonMessage={lastJsonMessage}
      players={players}
    />
  );
};

export { Game };
