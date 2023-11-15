import { ActiveGames, Room } from '@just-belgione/types';

// Create room doesn't actually create a room, but rather adds it to the active games directory.
const createRoom = ({
  activeGames,
  roomId,
}: {
  activeGames: ActiveGames;
  roomId: Room['_id'];
}) => {
  // Initialize room active game if it doesn't exist.
  activeGames[roomId] ??= { status: 'WAITING', playerSockets: {} };

  return;
};

export { createRoom };
