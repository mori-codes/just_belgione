import { ClientMessage, Player, StartRoundMessage } from '@just-belgione/types';
import { Button } from '../../../components/common/Button';
import { useParams } from 'react-router-dom';
import { useDifficulty } from '../../../atoms/difficultyAtom';
import { PageWrapper } from '../../../components/common/PageWrapper';

type Props = {
  guess: string;
  correctWord: string;
  correct: boolean;
  roundIndex: number;
  points: number;
  iAmGuessing: boolean;
  playerGuessing: Player;
  sendMessage: (jsonMessage: ClientMessage) => void;
};
const RoundResult = ({
  guess,
  correctWord,
  correct,
  roundIndex,
  points,
  iAmGuessing,
  sendMessage,
  playerGuessing
}: Props) => {
  const [difficulty] = useDifficulty();
  const { id: roomId } = useParams();

  const handleNextRound = () => {
    if (!roomId) return;

    const message: StartRoundMessage = {
      type: 'newRound',
      data: {
        roomId,
        difficulty,
      },
    };

    sendMessage(message);
  };

  return (
    <PageWrapper>
      <div className="min-h-[100dvh] w-full px-4 flex flex-col justify-center">
        <div className="bg-white rounded-sm w-full shadow-lg mb-8 py-6 px-4 flex justify-between text-jo-sm">
          <p>
            Puntos: {points}{' '}
            <span className={correct ? 'text-jo-green' : 'text-jo-red'}>
              {correct ? '+1' : '+0'}
            </span>
          </p>
          <p>Ronda {roundIndex + 1
          }</p>
        </div>
        <div className="w-full text-center py-8 rounded-sm bg-white mb-4 shadow-lg">
          <p className="text-jo-sm pb-4">La palabra era:</p>
          <p className="text-jo-lg uppercase">{correctWord}</p>
        </div>
        <div
          className={`w-full text-center py-8 mb-8 text-white rounded-sm shadow-lg ${
            correct ? 'bg-jo-green' : 'bg-jo-red'
          }`}
        >
          <p className="text-jo-sm pb-4">{playerGuessing} ha respondido:</p>
          <p className="text-jo-lg uppercase">{guess}</p>
        </div>
        {iAmGuessing ? (
          <Button onClick={handleNextRound}>Siguiente</Button>
        ) : null}
      </div>
    </PageWrapper>
  );
};
export default RoundResult;
