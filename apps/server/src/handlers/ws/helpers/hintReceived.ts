import { ActiveGames, Player, Room, Word } from '@just-belgione/types';
import { addHint, getRoom } from '../../../db/rooms.ts';
import { notifyAll } from './notify.ts';

const hintReceived = async (
  activeGames: ActiveGames,
  hint: Word,
  player: Player,
  roomId: Room['_id']
) => {
  await addHint(roomId, player, hint);

  const room = await getRoom(roomId);
  if (!room || !room.currentRound) throw new Error('Room invalid');

  notifyAll(activeGames, roomId, {
    type: 'hintReceived',
    status: 'PLAYING',
    data: {
      hints: room.currentRound.hints,
    },
  });
};

export { hintReceived };
