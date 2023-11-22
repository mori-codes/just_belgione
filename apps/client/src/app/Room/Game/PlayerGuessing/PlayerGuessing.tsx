import {
  ClientMessage,
  GuessMessage,
  Hint,
  ServerMessage,
} from '@just-belgione/types';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
};

const PlayerGuessing: React.FC<Props> = ({ lastJsonMessage, sendMessage }) => {
  const [hints, setHints] = useState<Hint[]>();
  const [guess, setGuess] = useState('');
  const { id: roomId } = useParams();

  useEffect(() => {
    if (lastJsonMessage.type !== 'finalHints') return;

    setHints(lastJsonMessage.data.validHints);
  }, [lastJsonMessage]);

  const sendGuess = () => {
    if (!roomId) return;

    const message: GuessMessage = {
      type: 'guess',
      data: {
        roomId,
        word: guess,
      },
    };

    sendMessage(message);
  };

  if (hints === undefined) {
    return (
      <PageWrapper variant="dark" center>
        <div className="flex min-h-[100dvh] justify-center text-white flex-col text-center gap-4 drop-shadow-lg px-4">
          <h2 className="text-jo-lg">¡Es tu turno!</h2>
          <p className="text-jo-md">
            Tus compañeros están pensando cuál es la mejor pista
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <div>
      Adivina maxo:{' '}
      <input
        type="text"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
      />
      <button onClick={sendGuess}>Enviar Respuesta</button>
      <ul>
        {hints.map((hint) => (
          <li key={hint.player}>
            {hint.player}: {hint.hint}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { PlayerGuessing };
