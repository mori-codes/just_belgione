import { ClientMessage, Player, StartRoundMessage } from '@just-belgione/types';
import { Button } from '../../../components/common/Button';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { BottomGradient } from '../../../components/common/BottomGradient';
import { useLocalization } from '../../../atoms/localizationAtom';
import { PointsDisplay } from './PointsDisplay';

type Props = {
  guess: string;
  correctWord: string;
  correct: boolean;
  roundIndex: number;
  points: number;
  iAmGuessing: boolean;
  playerGuessing: Player;
  nextPlayer: Player;
  isFinalRound: boolean;
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
  playerGuessing,
  nextPlayer,
  isFinalRound,
}: Props) => {
  const { id: roomId } = useParams();
  const { stringTable } = useLocalization();

  const handleNextRound = () => {
    if (!roomId) return;

    const message: StartRoundMessage = {
      type: 'newRound',
      data: {
        roomId,
      },
    };

    sendMessage(message);
  };

  return (
    <>
      <PageWrapper>
        <div className="min-h-[100dvh] w-full px-4 flex flex-col justify-center">
          <div className="bg-white rounded-sm w-full shadow-lg mb-8 py-6 px-4 flex justify-between text-jo-sm">
            <PointsDisplay points={points} correct={correct} />
            <p>
              {stringTable.ROUND} {roundIndex + 1}
            </p>
          </div>
          <div className="w-full text-center py-8 rounded-sm bg-white mb-4 shadow-lg">
            <p className="text-jo-sm pb-4">{stringTable.THE_WORD_WAS}</p>
            <p className="text-jo-lg uppercase">{correctWord}</p>
          </div>
          <div
            className={`w-full text-center py-8 mb-8 text-white rounded-sm shadow-lg ${
              correct ? 'bg-jo-green' : 'bg-jo-red'
            }`}
          >
            <p className="text-jo-sm pb-4">
              {playerGuessing} {stringTable.USER_GUESSED}{' '}
            </p>
            <p className="text-jo-lg uppercase">{guess}</p>
          </div>
          {iAmGuessing ? (
            <Button onClick={handleNextRound}>
              {isFinalRound
                ? stringTable.LAST_ROUND_BUTTON
                : stringTable.NEXT_ROUND_BUTTON}
            </Button>
          ) : null}
        </div>
      </PageWrapper>
      {iAmGuessing || isFinalRound ? null : (
        <BottomGradient color="main">
          <p
            className="text-jo-sm text-white drop-shadow-md text-center px-4
          "
          >
            {stringTable.NEXT_TURN}
          </p>
          <p
            className="text-jo-md text-white drop-shadow-md text-center px-4
          "
          >
            {nextPlayer.substring(0, 20)}
          </p>
        </BottomGradient>
      )}
    </>
  );
};
export default RoundResult;
