import { ServerMessage } from '@just-belgione/types';
import { PageWrapper } from '../../../components/common/PageWrapper';

type Props = {
  lastJsonMessage: ServerMessage;
};

const PlayerGuessing: React.FC<Props> = () => {
  return (
    <PageWrapper variant="dark" center>
      <div className='flex min-h-[100dvh] justify-center text-white flex-col text-center gap-4 drop-shadow-lg px-4'>
        <h2 className='text-jo-lg'>¡Es tu turno!</h2>
        <p className='text-jo-md'>Tus compañeros están pensando cuál es la mejor pista</p>
      </div>
    </PageWrapper>
  );
};

export { PlayerGuessing };
