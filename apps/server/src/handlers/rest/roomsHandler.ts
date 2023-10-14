import { Router } from 'oak';
import { createRoom, getRoom } from '../../db/rooms.ts';
import { isCreateRoomBody } from '@just-belgione/types';

const BASE_URL = '/rooms';

const setupRoomsRoutes = (router: Router) => {
  router.post(BASE_URL, async (ctx) => {
    console.log("ESTOY VIVO")
    if (!ctx.request.hasBody) {
      ctx.throw(415);
      return;
    }
    const room = await ctx.request.body().value;
    if (!isCreateRoomBody(room)) {
      ctx.throw(400);
      return;
    }
    console.log("ANTES DE CREAR")
    const id = await createRoom(room);
    console.log("DESPUES DE CREAR")
    ctx.response.body = { id };
  });

  router.get(`${BASE_URL}/:id`, async (ctx) => {
    const room = await getRoom(ctx.params['id']);

    ctx.response.body = room;
  });
};

export { setupRoomsRoutes };
