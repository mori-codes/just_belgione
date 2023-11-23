import { Hint, Player } from '@just-belgione/types';
import { getPlayerColor } from '../../helpers/getPlayerColor';
import { Cancel } from '../icons/Cancel';

type HintItemProps = {
  hint: Hint;
  color: string;
  onHintClick?: (hint: Hint, valid: boolean) => void;
};

const HintItem = ({ hint, color, onHintClick }: HintItemProps) => {
  const selected = hint.isValid === false;

  const selectedVariant = selected ? "bg-jo-red text-white after:border-white" : `bg-white after:border-${color}`;
  
  return (
    <button
      className={`rounded-sm shadow-md w-full text-jo-sm p-4 text-left relative flex justify-between items-center after:absolute after:left-1 after:top-1 after:right-1 after:bottom-1 after:rounded-sm after:border-2 ${selectedVariant}`}
      onClick={() => onHintClick?.(hint, selected) }
      disabled={onHintClick === undefined}
    >
      <span>{hint.hint}</span>
      {selected ? <Cancel /> : null}
    </button>
  );
};

type Props = {
  hints: Hint[];
  players: Player[];
  onHintClick?: (hint: Hint, valid: boolean) => void;
};

const HintList = ({ hints, players, onHintClick }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      {hints.map((hint) => (
        <HintItem
          key={`${hint.player}-${hint.hint}`}
          hint={hint}
          color={getPlayerColor(players.findIndex((p) => p === hint.player))}
          onHintClick={onHintClick}
        />
      ))}
    </div>
  );
};

export { HintList };
