import {
  ClientMessage,
  ConfirmHintsMessage,
  Hint,
  Player,
  Room,
} from '@just-belgione/types';
import { getPlayerColor } from '../../../helpers/getPlayerColor';

type Props = {
  hints: Hint[];
  setHints: React.Dispatch<React.SetStateAction<Hint[]>>;
  players: Player[];
  roomId: Room['_id'];
  sendMessage: (jsonMessage: ClientMessage) => void;
};
const AllHintsProvided = ({
  hints,
  setHints,
  players,
  roomId,
  sendMessage,
}: Props) => {
  const handleClick = (index: number) => () => {
    setHints((prev) => {
      const hints = [...prev];
      hints[index] = { ...hints[index], isValid: !hints[index].isValid };
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
    <div>
      <h2>¡Ya están todos!</h2>
      <p>Ahora toca descartar las pistas que consideréis idénticas</p>
      <div>
        <ul>
          {hints.map(({ player, hint, isValid }, index) => {
            const playerIndex = players.findIndex((p) => p === player);
            return (
              <li
                key={`${player}-${hint}`}
                className={'bg-' + getPlayerColor(playerIndex)}
                onClick={handleClick(index)}
              >
                {player}: {hint} {isValid === false ? 'X' : ''}
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" onClick={handleSend}>
        Continue
      </button>
    </div>
  );
};

export { AllHintsProvided };
