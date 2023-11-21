import { Player } from '@just-belgione/types';
import { getPlayerColor } from '../../helpers/getPlayerColor';

type Props = {
  players: Player[];
};

const getPlayers = (players: Player[]) =>
  players.map((player, index) => (
    <li className="flex text-jo-sm items-center gap-4" key={player}>
      <div className={`h-4 w-4 shrink-0 bg-${getPlayerColor(index)}`} />
      <span className='truncate'>{player}</span>
    </li>
  ));

const PlayerDisplay = ({ players }: Props) => {
  return (
    <div className="bg-white shadow-lg p-4 grow overflow-auto overflow-x-hidden rounded-sm">
      <h2 className="text-jo-sm pb-4">Esperando jugadores...</h2>
      <ul>{getPlayers(players)}</ul>
    </div>
  );
};

export { PlayerDisplay };
