import {
  ClientMessage,
  ConfirmHintsMessage,
  Hint,
  Player,
  Room,
} from '@just-belgione/types';
import { PageWrapper } from '../../../components/common/PageWrapper';
import { HintList } from '../../../components/common/HintList';
import { BottomGradient } from '../../../components/common/BottomGradient';
import { Button } from '../../../components/common/Button';
import { Person } from '../../../components/icons/Person';

type Props = {
  hints: Hint[];
  setHints: React.Dispatch<React.SetStateAction<Hint[]>>;
  players: Player[];
  roomId: Room['_id'];
  sendMessage: (jsonMessage: ClientMessage) => void;
};
const HintsPreview = ({
  hints,
  setHints,
  players,
  roomId,
  sendMessage,
}: Props) => {
  const areAllPlayersReady = hints.length === players.length - 1;

  const handleClick = (hint: Hint, valid: boolean) => {
    setHints((prev) => {
      const hints = [...prev];
      const index = hints.findIndex(
        (h) => h.hint === hint.hint && h.player === hint.player
      );

      hints[index] = { ...hints[index], isValid: valid };
      return hints;
    });
  };

  const handleSend = () => {
    const message: ConfirmHintsMessage = {
      type: 'confirmHints',
      data: {
        roomId,
        hints: hints.map((hint) =>
          hint.isValid === undefined ? { ...hint, isValid: true } : hint
        ),
      },
    };

    sendMessage(message);
  };

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col w-full px-4 pb-[150px]">
          <div className="text-center mt-[100px] mb-8">
            {areAllPlayersReady ? (
              <>
                <h2 className="text-jo-md">¡Ya están todos!</h2>
                <p className="text-jo-sm">
                  Ahora toca descartar las pistas que consideréis idénticas
                </p>
              </>
            ) : (
              <h2 className="text-jo-md">Esperando a todos</h2>
            )}
          </div>
          <HintList
            hints={hints}
            players={players}
            onHintClick={areAllPlayersReady ? handleClick : undefined}
          />
        </div>
      </PageWrapper>
      {areAllPlayersReady ? (
        <BottomGradient color="green">
          <div className="px-4">
            <Button bgColor="bg-jo-green" onClick={handleSend}>
              Confirmar
            </Button>
          </div>
        </BottomGradient>
      ) : (
        <BottomGradient color="black">
          <div className="px-4">
            <Button bgColor="bg-jo-black" onClick={handleSend}>
              <div className="flex items-center justify-center gap-4">
                {hints.length} / {players.length - 1} <Person />
              </div>
            </Button>
          </div>
        </BottomGradient>
      )}
    </>
  );
};

export { HintsPreview };
