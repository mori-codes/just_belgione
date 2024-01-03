import { Word } from '@just-belgione/types';
import { useState } from 'react';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useLocalization } from '../../../atoms/localizationAtom';

type Props = {
  wordToGuess: Word;
  onSend: (hint: Word) => void;
  playerIndex: number;
};
const SendHintScreen = ({ wordToGuess, onSend, playerIndex }: Props) => {
  const [hint, setHint] = useState<Word>('');
  const { stringTable } = useLocalization();

  return (
    <PageWrapper center>
      <div className="flex min-h-[100dvh] justify-center flex-col gap-8 px-4 w-full">
        <div className="text-center bg-white rounded-sm py-4 shadow-md text-jo-sm">
          {stringTable.THE_WORD_IS}
          <h2 className="text-jo-lg py-4 uppercase">{wordToGuess}</h2>
        </div>
        <Input
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder={stringTable.HINT_INPUT_PLACEHOLDER}
          playerIndex={playerIndex}
        />
        <Button onClick={() => onSend(hint)}>{stringTable.SEND_HINT_BUTTON}</Button>
      </div>
    </PageWrapper>
  );
};

export { SendHintScreen };
