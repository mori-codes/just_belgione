const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

Deno.serve((req) => {
  if (req.headers.get('upgrade') !== 'websocket') {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener('open', () => {
    console.log('a client connected!');
  });
  socket.addEventListener('message', async (event) => {
    socket.send(`${event.data} - Received!`); // Send message with its own message.
    await sleep(3000); // Wait 3 seconds.
    socket.send('Three seconds later...'); // Send one more message.
  });
  return response;
});
