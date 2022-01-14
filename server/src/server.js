const WebSocket = require("ws");
const express = require("express");
const app = express();

const wss = new WebSocket.Server({ port: 5000 });

console.log(`Express Started`);
app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8080, function () {
    var host = "127.0.0.1"
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})


console.log("WebSocket Server started");
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

