import { Word } from '@just-belgione/types';
import { useState } from 'react';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';

type Props = {
  wordToGuess: Word;
  onSend: (hint: Word) => void;
  playerIndex: number;
};
const SendHintScreen = ({ wordToGuess, onSend, playerIndex }: Props) => {
  const [hint, setHint] = useState<Word>('');

  return (
    <PageWrapper center>
      <div className="flex min-h-[100dvh] justify-center flex-col gap-8 px-4 w-full">
        <div className="text-center bg-white rounded-sm py-4 shadow-md text-jo-sm">
          La palabra es:
          <h2 className="text-jo-lg py-4 uppercase">{wordToGuess}</h2>
        </div>
        <Input
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Escribe aquí tu pista"
          playerIndex={playerIndex}
        />
        <Button onClick={() => onSend(hint)}>Enviar</Button>
      </div>
    </PageWrapper>
  );
};

export { SendHintScreen };
