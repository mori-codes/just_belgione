import {
  ClientMessage,
  GuessMessage,
  Hint,
  Player,
  ServerMessage,
} from '@just-belgione/types';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HintList } from '../../../components/common/HintList';
import { BottomGradient } from '../../../components/common/BottomGradient';
import { Input } from '../../../components/common/Input';
import { ArrowRight } from '../../../components/icons/ArrowRight';
import { useLocalization } from '../../../atoms/localizationAtom';

type Props = {
  lastJsonMessage: ServerMessage;
  sendMessage: (jsonMessage: ClientMessage) => void;
  players: Player[];
};

const PlayerGuessing: React.FC<Props> = ({
  lastJsonMessage,
  sendMessage,
  players,
}) => {
  const [hints, setHints] = useState<Hint[]>();
  const [guess, setGuess] = useState('');
  const { id: roomId } = useParams();
  const { stringTable } = useLocalization();

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
          <h2 className="text-jo-lg">{stringTable.YOUR_TURN}</h2>
          <p className="text-jo-md">{stringTable.YOUR_TURN_DESCRIPTION}</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col w-full px-4 pb-[150px] pt-[100px]">
          <p className="text-jo-md text-center mb-8">
            {stringTable.YOUR_HINTS}
          </p>
          <HintList hints={hints} players={players} showPlaceholder />
        </div>
      </PageWrapper>
      <BottomGradient color="main">
        <div className="flex items-center px-4 gap-4 max-w-[600px] mx-auto">
          <div className="grow">
            <Input
              placeholder={stringTable.YOUR_GUESS_PLACEHOLDER}
              value={guess}
              onChange={(ev) => setGuess(ev.target.value)}
            />
          </div>
          <button
            className="w-[50px] h-[50px] rounded-sm bg-jo-main text-white shadow-lg flex justify-center items-center"
            onClick={sendGuess}
          >
            <ArrowRight />
          </button>
        </div>
      </BottomGradient>
    </>
  );
};

export { PlayerGuessing };
