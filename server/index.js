const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const io = socketio(server);

io.on('connection', (sock) => {
    console.log("Test");
});

console.log("Hello, world!");

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log('App started on ' + port);
});