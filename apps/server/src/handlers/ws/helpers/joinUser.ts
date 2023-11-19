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
  const activeGame = activeGames[roomId];
  // At this point, createGame should have been called
  // If that's not the case, close the socket in hopes
  // That the next time we select the correct machine
  if(!activeGame){
    socket.close()
    return
  }

  const { status: gameStatus } = activeGame;

  // Check if the player is already in the game.
  const existingPlayer = Object.keys(activeGame.playerSockets).find(
    (playerName) => playerName === player
  );

  // If a different user is trying to join with the same name, intercept and return error
  if (existingPlayer) {
    const playerSocket = activeGame.playerSockets[existingPlayer];
    if (playerSocket.readyState === WebSocket.OPEN) {
      notifyPlayer(socket, {
        type: 'duplicatePlayerError',
        data: {
          message:
            'Ya hay un jugador con tu nombre en la sala',
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
        message: '¡La partida a la que te intentas unir ya ha empezado!',
      },
      status: 'PLAYING',
    });
    return;
  }

  // Add or update the new user to the activeGames mapping
  activeGame.playerSockets[player] = socket;

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
    status: room.status,
  });
};

export { joinUser };
