import {
  ClientMessage,
  Hint,
  Player,
  ServerMessage,
  Word,
} from '@just-belgione/types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useUser } from '../../../atoms/userAtom';
import { useParams } from 'react-router-dom';
import { getPlayerColor } from '../../../helpers/getPlayerColor';

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
  const [hint, setHint] = useState<Word>('');
  const [status, setStatus] = useState<
    'noHintProvided' | 'hintProvided' | 'allHintsProvided'
  >('noHintProvided');
  const [hints, setHints] = useState<Hint[]>([]);
  const [user] = useUser();
  const { id: roomId } = useParams();

  const handleHintChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setHint(value);
  };

  useEffect(() => {
    if (lastJsonMessage?.type !== 'hintReceived') return;

    setHints(lastJsonMessage.data.hints);
    if (lastJsonMessage.data.hints.length === players.length - 1) {
      setStatus('allHintsProvided');
    }
  }, [lastJsonMessage, players]);

  const handleSend = () => {
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
        <BeforeSendingHint
          wordToGuess={wordToGuess}
          hint={hint}
          onChange={handleHintChange}
          onSend={handleSend}
        />
      );
    case 'hintProvided':
      return <AfterSendingHint hints={hints} players={players} />;

    case 'allHintsProvided':
      return (
        <AllHintsProvided hints={hints} setHints={setHints} players={players} />
      );
  }
};

const BeforeSendingHint: React.FC<{
  wordToGuess: Word;
  hint: Word;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSend: () => void;
}> = ({ wordToGuess, hint, onChange, onSend }) => (
  <div>
    <div>
      La palabra es:
      <h2>{wordToGuess}</h2>
    </div>
    <div>
      <input
        type="text"
        value={hint}
        onChange={onChange}
        placeholder="Escribe aquí tu pista"
      />
      <button onClick={onSend}>Enviar</button>
    </div>
  </div>
);

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
      prev[index] = { ...prev[index], isValid: !prev[index].isValid };
      return prev;
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
                {player}: {hint} {!isValid ? 'X' : ''}
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
