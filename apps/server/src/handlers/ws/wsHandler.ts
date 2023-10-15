import { Router } from 'oak';
import { ActiveGames, SocketMessage } from '@just-belgione/types';
import { joinUser } from './helpers/joinUser.ts';
import { startGame } from './helpers/startGame.ts';

const BASE_URL = '/ws';

/**
 * Active games is an mapping that contains the information
 * of a live game. Every key simbolizes a room id, and its
 * content is a mapping between user names and their sockets.
 */
const activeGames: ActiveGames = {};

const setupWs = (router: Router) => {
  router.get(BASE_URL, (ctx) => {
    if (!ctx.isUpgradable) {
      ctx.throw(501);
      return;
    }

    const socket = ctx.upgrade();

    socket.onopen = () => {};
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as SocketMessage;
      switch (message.type) {
        case 'join':
          joinUser({
            activeGames,
            player: message.data.player,
            roomId: message.data.roomId,
            socket,
          });
          break;
        case 'start':
          startGame(activeGames, message.data.roomId);
          break;
      }
    };
    socket.onclose = () => {
      // TODO: If all the users in the game have their connection closed,
      // errase the game from the mapping.
    };
  });
};

export { setupWs };
