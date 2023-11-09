import { ActiveGames, Player, Room } from '@just-belgione/types';
import { notifyAll, notifyPlayer } from './notify.ts';
import { addPlayer, getRoom } from '../../../db/rooms.ts';

// TODO: Check status of the game. Player can't join if the game is already started.
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
  // Initialize room active game if it doesn't exist.
  activeGames[roomId] ??= {};

  // Check if the player is already in the game.
  const existingPlayer = Object.keys(activeGames[roomId]).find(
    (playerName) => playerName === player
  );

  // If a different user is trying to join with the same name, intercept and return error
  if (existingPlayer) {
    const playerSocket = activeGames[roomId][existingPlayer];
    if (playerSocket.readyState === WebSocket.OPEN) {
      notifyPlayer(socket, {
        type: 'duplicatePlayerError',
        data: {
          message:
            'There is already a player in this room with the same name, please choose another one.',
        },
        status: 'WAITING',
      });

      return;
    }
  }

  // Add or update the new user to the activeGames mapping
  activeGames[roomId][player] = socket;

  // Update the database. (if player is not already there)
  if (!existingPlayer) {
    await addPlayer(roomId, player);
  }

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
