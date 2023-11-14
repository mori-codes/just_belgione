import { ClientMessage, Round, ServerMessage } from '@just-belgione/types';
import { useEffect, useState } from 'react';
import { useUser } from '../../atoms/userAtom';
import { PlayerGuessing } from './PlayerGuessing/PlayerGuessing';
import { PlayerNotGuessing } from './PlayerNotGuessing/PlayerNotGuessing';
import { useNavigate } from 'react-router-dom';

type Props = {
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
};

const Game: React.FC<Props> = ({ lastJsonMessage, sendMessage }) => {
  const [user] = useUser();
  const [state, setState] = useState<Round>();
  const iAmGuessing = state?.playerGuessing === user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastJsonMessage || lastJsonMessage?.type !== 'newRound') return;
    setState(lastJsonMessage.data.round);
  }, [lastJsonMessage]);

  // Handle invalid room error
  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === 'invalidGameError') {
      // TODO: Display error message
      navigate(`/?error=${lastJsonMessage.data.message}`);
    }
  }, [lastJsonMessage, navigate]);

  return iAmGuessing ? (
    <PlayerGuessing lastJsonMessage={lastJsonMessage} />
  ) : (
    <PlayerNotGuessing
      wordToGuess={state?.wordToGuess || ''}
      sendMessage={sendMessage}
      lastJsonMessage={lastJsonMessage}
    />
  );
};

export { Game };
