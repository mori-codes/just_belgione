import {
  ClientMessage,
  Player,
  Room,
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
import { useDifficulty } from '../../atoms/difficultyAtom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../resources/room/room.hooks';

type Props = {
  players: Player[];
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
  room: Room;
};

const Game: React.FC<Props> = ({
  players,
  lastJsonMessage,
  sendMessage,
  room,
}) => {
  const [user] = useUser();
  const [, setDifficulty] = useDifficulty();
  const [round, setRound] = useState<Round | undefined>(room.currentRound);
  const [roundResult, setRoundResult] = useState<RoundResultMessage['data']>();
  const iAmGuessing = round?.playerGuessing === user;
  const navigate = useNavigate();
  const { enqueueError } = useNotificationContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (lastJsonMessage.type === 'newRound') {
      setRound(lastJsonMessage.data.round);
      queryClient.setQueryData([QUERY_KEY, room._id], (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          currentRound: lastJsonMessage.data.round,
        };
      });
      setDifficulty(lastJsonMessage.data.difficulty);
      setRoundResult(undefined);
    }

    if (lastJsonMessage.type === 'roundResult') {
      setRoundResult(lastJsonMessage.data);
    }
  }, [lastJsonMessage, queryClient, room._id, setDifficulty]);

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
        iAmGuessing={iAmGuessing}
        sendMessage={sendMessage}
        playerGuessing={round?.playerGuessing || ''}
        nextPlayer={players[(roundIndex + 1) % players.length]}
        isFinalRound={roundIndex === (players.length * 2) - 1}
      />
    );
  }

  return iAmGuessing ? (
    <PlayerGuessing
      lastJsonMessage={lastJsonMessage}
      sendMessage={sendMessage}
      players={players}
    />
  ) : (
    <PlayerNotGuessing
      wordToGuess={round?.wordToGuess || ''}
      sendMessage={sendMessage}
      lastJsonMessage={lastJsonMessage}
      players={players}
      room={room}
    />
  );
};

export { Game };
