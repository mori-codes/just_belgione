import { ActiveGames, SocketMessage } from '@just-belgione/types';

const notifyAll = (
  activeGames: ActiveGames,
  roomId: string,
  message: SocketMessage
) => {
  if (!activeGames[roomId]) return;
  const sockets = Object.values(activeGames[roomId]) as WebSocket[];
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(message));
  });
};

export { notifyAll };
