import { Router } from 'oak';
import { getRoom } from "../../db/rooms.ts";


const BASE_URL = "/rooms"

const setupRoomsRoutes = (router: Router) => {
    router.get(`${BASE_URL}/:id`, async ctx => {
        const room = await getRoom(ctx.params["id"])

        ctx.response.body = room
    })
};

export { setupRoomsRoutes };
