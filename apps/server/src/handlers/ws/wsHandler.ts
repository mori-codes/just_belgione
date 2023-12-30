import { Router } from 'oak';
import { ActiveGames, ClientMessage } from '@just-belgione/types';
import { joinUser } from './helpers/joinUser.ts';
import { startRound } from './helpers/startRound.ts';
import { hintReceived } from './helpers/hintReceived.ts';
import { createRoom } from './helpers/createRoom.ts';
import { confirmHints } from './helpers/confirmHints.ts';
import { guess } from './helpers/guess.ts';
import { updateHints } from './helpers/updateHints.ts';

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

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data) as ClientMessage;
      switch (message.type) {
        case 'start':
        case 'newRound':
          await startRound(
            activeGames,
            message.data.roomId,
            message.data.difficulty
          );
          break;
        case 'sendHint':
          await hintReceived(
            activeGames,
            message.data.hint,
            message.data.player,
            message.data.roomId
          );
          break;
        case 'updateHints':
          await updateHints(
            activeGames,
            message.data.roomId,
            message.data.hints
          );
          break;
        case 'confirmHints':
          await confirmHints(
            activeGames,
            message.data.roomId,
            message.data.hints
          );
          break;
        case 'guess':
          await guess(activeGames, message.data.roomId, message.data.word);
          break;
      }
    };
    socket.onclose = () => {
      // TODO: If all the users in the game have their connection closed,
      // erase the game from the mapping.
    };
  });
};

export { setupWs };
