import { Word } from '@just-belgione/types';
import { ChangeEventHandler, useState } from 'react';

interface Props {
  wordToGuess: Word;
}

const PlayerNotGuessing: React.FC<Props> = ({ wordToGuess }) => {
  const [hint, setHint] = useState<Word>('');

  const handleHintChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setHint(value);
  };

  const handleSend = () => {
    // TODO: Implement.
  };

  return (
    <div>
      <div>
        La palabra es:
        <h2>{wordToGuess}</h2>
      </div>
      <div>
        <input
          type="text"
          value={hint}
          onChange={handleHintChange}
          placeholder="Escribe aquí tu pista"
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export { PlayerNotGuessing };
