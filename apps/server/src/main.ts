import { Application, Router } from 'oak';
import { oakCors } from 'cors';
import { setupRoomsRoutes } from './handlers/rest/roomsHandler.ts';

let port = 80;
if (Deno.env.get('PRODUCTION') !== 'true') {
  port = 8000;
  console.log('Using local environment settings: ', Deno.env.get('PRODUCTION'));
  import('./environment.ts');
}

const app = new Application();
const router = new Router();

// ROOM HANDLERS
setupRoomsRoutes(router);

// START SERVER
app.use(oakCors({
  origin: 'http://localhost:4200',
}))
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port });

// Deno.serve((req) => {
//   if (req.headers.get('upgrade') !== 'websocket') {
//     return new Response(null, { status: 501 });
//   }
//   const { socket, response } = Deno.upgradeWebSocket(req);
//   socket.addEventListener('open', () => {
//     console.log('a client connected!');
//   });
//   socket.addEventListener('message', async (event) => {
//     socket.send(`${event.data} - Received!`); // Send message with its own message.
//   });

//   return response;
// });
