import { Router } from 'oak';
import { SocketMessage } from '@just-belgione/types';
import { startGame } from "./helpers/startGame.ts";

const BASE_URL = '/ws';

const setupWs = (router: Router) => {
  router.get(BASE_URL, (ctx) => {
    if (!ctx.isUpgradable) {
      ctx.throw(501);
      return;
    }

    const socket = ctx.upgrade();

    socket.onopen = () => {};
    socket.onmessage = (event: MessageEvent<SocketMessage>) => {
      switch (event.data.type) {
        case "joinGame":
            startGame()
            break
      }
    };
    socket.onclose = () => {};
  });
};

export { setupWs };
