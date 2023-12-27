import { getPlayerColor } from '../../helpers/getPlayerColor';

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  playerIndex?: number;
};

const Input = ({ value, onChange, label, placeholder, playerIndex }: Props) => {
  const playerOutlineClassname = `after:absolute after:pointer-events-none after:left-1 after:top-1 after:right-1 after:bottom-1 after:rounded-sm after:border-${getPlayerColor(
    playerIndex ?? 0
  )} after:border-2`;

  return (
    <div className="flex flex-col">
      {label ? <label className="text-jo-sm">{label}</label> : null}
      <div
        className={`relative ${playerIndex !== undefined ? playerOutlineClassname : ''}`}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`${playerIndex !== undefined ? 'h-[75px]' : 'h-[50px]'} ${
            playerIndex !== undefined ? 'p-6' : 'p-4'
          } w-full rounded-sm shadow-lg text-jo-sm focus-visible:outline-0`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export { Input };
