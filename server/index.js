const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//Local includes
const db = require('dbfunction.js');
const ClientResponse = require('clientresponse.js')

const app = express();
const server = http.createServer(app);

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const io = socketio(server);

let env = {
  clients = [],
  game = {}
};

env.game['cointoss'] = require('cointoss.js').game;

io.on("connection", (sock) => {
  sock.on("init", (request) => {
    try{
      resp = new ClientResponse(sock, env);
      if(request.register){
        db.register(request.username);
      }
      else if(!db.authenticate(request.username, request.token)){
        resp.authenticationFailed();
        return;
      }

      let id = db.getID(request.username);
      env.clients[id] = resp;
      resp.register(id);

      //Retrieve all unread messages and send them back to the client
      let messageIDs = db.getMessagesForID(id);
      for(let i = 0; i < messageIDs.length; i++){
        resp.sendMessage(db.getMessage(messageIDs(i)));
      }
    }
    catch(err){
      console.log("Error (1): " + err);
    }
  });
});



console.log("Hello, world!");

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("App started on " + port);
});