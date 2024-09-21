const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 1111 });

const broadcastClientCount = () => {
  const countMessage = JSON.stringify({ type: 'clientCount', count: clients.size -1 });
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(countMessage);
    }
  });
};

const clients = new Set(); // To store connected clients

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('A new client connected.');

  broadcastClientCount();

  ws.on('message', (message) => {
    console.log('Received:', message);
    // Handle incoming messages
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('A client disconnected.');

    broadcastClientCount();
  });
});

// Export the WebSocket server and clients set
module.exports = { wss, clients };