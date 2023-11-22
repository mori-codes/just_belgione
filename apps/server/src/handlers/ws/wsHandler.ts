import { Router } from 'oak';
import { ActiveGames, ClientMessage } from '@just-belgione/types';
import { joinUser } from './helpers/joinUser.ts';
import { startGame } from './helpers/startGame.ts';
import { hintReceived } from './helpers/hintReceived.ts';
import { createRoom } from './helpers/createRoom.ts';
import { confirmHints } from './helpers/confirmHints.ts';

const BASE_URL = '/ws';

/**
 * Active games is an mapping that contains the information
 * of a live game. Every key symbolizes a room id, and its
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

    // TODO: Investigate how to work with sockets.
    socket.onopen = () => {
      const player = ctx.request.url.searchParams.get('player');
      const roomId = ctx.request.url.searchParams.get('roomId');
      const newRoom = ctx.request.url.searchParams.get('newRoom') === 'true';

      if (!player || !roomId) {
        ctx.throw(400);
        return;
      }

      if (newRoom) {
        createRoom({
          activeGames,
          roomId,
        });
      }

      joinUser({
        activeGames,
        player,
        roomId,
        socket,
      });
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as ClientMessage;
      switch (message.type) {
        case 'start':
          startGame(activeGames, message.data.roomId);
          break;
        case 'sendHint':
          // TODO: Make parameters an object
          hintReceived(
            activeGames,
            message.data.hint,
            message.data.player,
            message.data.roomId
          );
          break;
        case 'confirmHints':
          confirmHints(activeGames, message.data.roomId, message.data.hints);
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
