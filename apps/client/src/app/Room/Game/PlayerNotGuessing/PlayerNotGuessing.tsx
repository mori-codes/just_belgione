import { ClientMessage, Hint, ServerMessage, Word } from '@just-belgione/types';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useUser } from '../../../atoms/userAtom';
import { useParams } from 'react-router-dom';

type Props = {
  wordToGuess: Word;
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
};

const PlayerNotGuessing: React.FC<Props> = ({
  wordToGuess,
  lastJsonMessage,
  sendMessage,
}) => {
  const [hint, setHint] = useState<Word>('');
  const [hintWasSent, setHintWasSent] = useState<boolean>(false);
  const [hints, setHints] = useState<Hint[]>([]);
  const [user] = useUser();
  const { id: roomId } = useParams();

  const handleHintChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setHint(value);
  };

  useEffect(() => {
    if (lastJsonMessage?.type === 'hintReceived') {
      setHints(lastJsonMessage.data.hints);
    }
  }, [lastJsonMessage]);

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
    setHintWasSent(true);
  };

  return hintWasSent ? (
    <BeforeSendingHint
      wordToGuess={wordToGuess}
      hint={hint}
      onChange={handleHintChange}
      onSend={handleSend}
    />
  ) : (
    <AfterSendingHint hints={hints} />
  );
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

const AfterSendingHint: React.FC<{ hints: Hint[] }> = ({ hints }) => (
  <div>
    <div>Esperando a todos</div>
    <div>
      <ul>
        {hints.map(({ player, hint }) => (
          <li>
            {player}: {hint}
          </li>
        ))}
      </ul>
    </div>
    <div>TODO: Contador de players</div>
  </div>
);

export { PlayerNotGuessing };
