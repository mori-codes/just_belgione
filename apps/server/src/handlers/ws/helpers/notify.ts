import { ActiveGames, ServerMessage } from '@just-belgione/types';

const notifyPlayer = (socket: WebSocket, message: ServerMessage) => {
  // Only attempt to send a message if websocket is ready
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

const notifyAll = (
  activeGames: ActiveGames,
  roomId: string,
  message: ServerMessage
) => {
  if (!activeGames[roomId]) return;
  const sockets = Object.values(activeGames[roomId].playerSockets) as WebSocket[];
  sockets.forEach((socket) => {
    notifyPlayer(socket, message);
  });
};

export { notifyPlayer, notifyAll };
