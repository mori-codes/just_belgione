import { Room, ServerMessage } from '@just-belgione/types';
import { PageWrapper } from '../../components/common/PageWrapper';
import { ButtonLink } from '../../components/common/ButtonLink';
import { useLocalization } from '../../atoms/localizationAtom';

type Props = {
  lastJsonMessage?: ServerMessage;
  room: Room;
};

const GameOver = ({ lastJsonMessage, room }: Props) => {
  const { stringTable } = useLocalization();
  const roomData =
    lastJsonMessage?.type === 'gameOver' ? lastJsonMessage.data.room : room;

  const rounds = roomData.currentRound
    ? [roomData.currentRound, ...roomData.rounds]
    : roomData.rounds;
  const correctRounds = rounds.filter((round) => round.correct === true).length;

  return (
    <PageWrapper variant="dark">
      <div className="w-full">
        <div className="h-[90dvh] w-full px-8 flex flex-col gap-8 text-center items-center justify-center text-white drop-shadow-lg">
          <div>
            <h2 className="text-jo-md">{stringTable.RESULT}</h2>
            <h1 className="text-jo-lg">
              {correctRounds}/{rounds.length} {stringTable.WORDS}
            </h1>
          </div>
          <h2 className="text-jo-md">
            {Math.floor((correctRounds * 100) / rounds.length)}%, {stringTable.PERCENTAGE_DESCRIPTION}
          </h2>
          <ButtonLink to="/" bgColor="bg-jo-purple">
            {stringTable.END_BUTTON}
          </ButtonLink>
        </div>
        <div className="h-[70dvh] w-full bg-white rounded-lg text-center flex flex-col items-center text-jo-grey">
          <div className="h-4 w-24 rounded-lg bg-jo-grey mt-4" />
          <div className="grow flex flex-col justify-center text-center">
            <h2 className="text-jo-md">{stringTable.COMING_SOON}</h2>
            <p className="text-jo-sm">{stringTable.COMING_SOON_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export { GameOver };
