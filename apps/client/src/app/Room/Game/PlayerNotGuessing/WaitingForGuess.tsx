import { Hint, Player } from '@just-belgione/types';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { HintList } from '../../../components/common/HintList';
import { BottomGradient } from '../../../components/common/BottomGradient';

type Props = {
  hints: Hint[];
  playerGuessing: string;
  players: Player[];
};

const WaitingForGuess = ({ playerGuessing, hints, players }: Props) => {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col w-full px-4 pb-[150px] pt-[100px]">
          <p className="text-jo-md text-center mb-8">Tus pistas</p>
          <HintList hints={hints} players={players} showPlaceholder />
        </div>
      </PageWrapper>
      <BottomGradient color="main">
        <p
          className="text-jo-md text-white drop-shadow-md text-center px-4
        "
        >
          {playerGuessing.substring(0, 20)} está pensando...
        </p>
      </BottomGradient>
    </>
  );
};

export { WaitingForGuess };
