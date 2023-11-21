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
import { getPlayerColor } from '../../../helpers/getPlayerColor';
import { SendHintScreen } from './SendHintScreen';

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
    'noHintProvided' | 'hintProvided' | 'allHintsProvided'
  >('noHintProvided');
  const [hints, setHints] = useState<Hint[]>([]);
  const [user] = useUser();
  const { id: roomId } = useParams();

  useEffect(() => {
    if (lastJsonMessage?.type !== 'hintReceived') return;

    setHints(lastJsonMessage.data.hints);
    if (lastJsonMessage.data.hints.length === players.length - 1) {
      setStatus('allHintsProvided');
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

  switch (status) {
    case 'noHintProvided':
      return (
        <SendHintScreen wordToGuess={wordToGuess} onSend={handleSend} playerIndex={players.findIndex((p) => p === user)}/>
      );
    case 'hintProvided':
      return <AfterSendingHint hints={hints} players={players} />;

    case 'allHintsProvided':
      return (
        <AllHintsProvided hints={hints} setHints={setHints} players={players} />
      );
  }
};

const AfterSendingHint: React.FC<{ hints: Hint[]; players: Player[] }> = ({
  hints,
  players,
}) => (
  <div>
    <div>Esperando a todos</div>
    <div>
      <ul>
        {hints.map(({ player, hint }) => {
          const playerIndex = players.findIndex((p) => p === player);
          return (
            <li className={getPlayerColor(playerIndex)}>
              {player}: {hint}
            </li>
          );
        })}
      </ul>
    </div>
    <div>
      {hints.length}/{players.length}
    </div>
  </div>
);

const AllHintsProvided: React.FC<{
  hints: Hint[];
  setHints: React.Dispatch<React.SetStateAction<Hint[]>>;
  players: Player[];
}> = ({ hints, setHints, players }) => {
  const handleClick = (index: number) => () => {
    setHints((prev) => {
      const hints = [...prev];
      hints[index] = { ...hints[index], isValid: !hints[index].isValid };
      return hints;
    });
  };

  const handleSend = () => {
    // TODO: Implement send invalid hints.
  };

  return (
    <div>
      <h2>¡Ya están todos!</h2>
      <p>Ahora toca descartar las pistas que consideréis idénticas</p>
      <div>
        <ul>
          {hints.map(({ player, hint, isValid }, index) => {
            const playerIndex = players.findIndex((p) => p === player);
            return (
              <li
                className={getPlayerColor(playerIndex)}
                onClick={handleClick(index)}
              >
                {player}: {hint} {isValid === false ? 'X' : ''}
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" onClick={handleSend}>
        Continue
      </button>
    </div>
  );
};

export { PlayerNotGuessing };
