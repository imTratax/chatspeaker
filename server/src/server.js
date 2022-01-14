const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

try {
    wss.on('connection', function connection(ws) {
        console.log(`A new websocket session has established`);
        ws.on('message', function message(data, isBinary) {
            console.log(`Message from client ${data}`);
            // Broadcast websocket messages to all clients
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data, { binary: isBinary });
                }
            });
        });
    });
} catch(error) {
    console.log(`WSS: Error during server setup ${error}`)
}

