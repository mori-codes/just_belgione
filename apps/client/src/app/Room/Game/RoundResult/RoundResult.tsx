import { ClientMessage, StartRoundMessage } from '@just-belgione/types';
import { Button } from '../../../components/common/Button';
import { useParams } from 'react-router-dom';
import { useDifficulty } from '../../../atoms/difficultyAtom';

type Props = {
  guess: string;
  correctWord: string;
  correct: boolean;
  roundIndex: number;
  points: number;
  playerGuessing: boolean;
  sendMessage: (jsonMessage: ClientMessage) => void;
};
const RoundResult = ({
  guess,
  correctWord,
  correct,
  roundIndex,
  points,
  playerGuessing,
  sendMessage,
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
    <div>
      <p>
        Puntos: {points} {correct ? '+1' : '+0'}
      </p>
      <p>Ronda: {roundIndex}</p>
      <p>La palabra era: {correctWord}</p>
      <p className={`${correct ? 'bg-jo-green' : 'bg-jo-red'}`}>
        $FALTA NOMBRE$ ha respondido: {guess}
      </p>
      {playerGuessing ? (
        <Button onClick={handleNextRound}>Siguiente</Button>
      ) : null}
    </div>
  );
};
export default RoundResult;
