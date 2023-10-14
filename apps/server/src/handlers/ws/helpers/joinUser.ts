import { ActiveGames, Player, Room } from '@just-belgione/types';
import { notifyAll } from './notify.ts';
import { addPlayer, getRoom } from '../../../db/rooms.ts';

const joinUser = async ({
  activeGames,
  player,
  roomId,
  socket,
}: {
  activeGames: ActiveGames;
  player: Player;
  roomId: Room['_id'];
  socket: WebSocket;
}) => {
  // Add the new user to the activeGames mapping
  activeGames[roomId] ??= {};
  activeGames[roomId][player] = socket;

  // Update the database.
  await addPlayer(roomId, player);
  const room = await getRoom(roomId);
  if (!room) {
    throw new Error('The room cannot be null');
  }

  // Notify all the players.
  notifyAll(activeGames, roomId, {
    type: 'playerJoined',
    data: {
      players: room.players,
    },
    status: 'WAITING',
  });
};

export { joinUser };
