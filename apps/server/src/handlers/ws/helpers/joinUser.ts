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
  activeGames[roomId] ??= { status: 'WAITING', playerSockets: {} };
  const { status: gameStatus } = activeGames[roomId];

  console.log(activeGames[roomId])

  // Check if the player is already in the game.
  const existingPlayer = Object.keys(activeGames[roomId].playerSockets).find(
    (playerName) => playerName === player
  );

  // If a different user is trying to join with the same name, intercept and return error
  if (existingPlayer) {
    const playerSocket = activeGames[roomId].playerSockets[existingPlayer];
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

  // If the game is already started, and user is not already inside, return error
  if (gameStatus === 'PLAYING' && !existingPlayer) {
    notifyPlayer(socket, {
      type: 'invalidGameError',
      data: {
        message: 'The game you tried to join is already started.',
      },
      status: 'PLAYING',
    });
    return;
  }

  // Add or update the new user to the activeGames mapping
  activeGames[roomId].playerSockets[player] = socket;

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
