import { Room, RoomStatus, Round, SocketMessage } from '@just-belgione/types';
import { useEffect, useState } from 'react';
import { useUser } from '../../atoms/userAtom';
import { PlayerGuessing } from './PlayerGuessing/PlayerGuessing';
import { PlayerNotGuessing } from './PlayerNotGuessing/PlayerNotGuessing';

interface Props {
  lastJsonMessage: SocketMessage;
}

const Game: React.FC<Props> = ({ lastJsonMessage }) => {
  const [user] = useUser();
  const [state, setState] = useState<Round>();
  const iAmGuessing = state?.playerGuessing === user;

  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage?.type !== 'newRound') return;
    setState(lastJsonMessage.data.round);
  }, [lastJsonMessage]);

  return iAmGuessing ? (
    <PlayerGuessing />
  ) : (
    <PlayerNotGuessing wordToGuess={state?.wordToGuess || ''} />
  );
};

export { Game };
