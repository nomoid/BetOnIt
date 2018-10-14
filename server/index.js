const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain);

app.use(express.static(clientPath));

//Backend code for socket.io
const io = socketio(server);
io.origins('*:*');

console.log("Hello, world!");

//List of games that are available
//Currently only cointoss
let games = {
    'cointoss': {
        //Return winner
        'run': function(players, inputs){
            if(Math.random() < 0.5){
                return players[0];
            }
            else{
                return players[1];
            }
        },
        'maxPlayers': function(){
            return 2;
        }
    }
};

//Map of player ids to sockets and what room the player is in
let socks = {

};

//Map of rooms to the game data stored in the rooms and which players are in the room
let rooms = {

};

//List of room ids that are public
let publicRooms = [];

//Map of player ids to amount of credit that player has
let balances = {

};

//Called when a new player joins
//Socket io is an event based system for communicating between the clients and the server
//The input and callback signatures will be provided for the following events
io.on("connection", (sock) => {
    console.log("Player joined");
    /*
    input: {
        id: (int)
    }
    callback: balance (int)
    */
    sock.on("initialize", (info, callback) => {
        let id = info.id;
        console.log("Player connected with id " + id);
        socks[id] = {
            sock: sock
        };
        if(!balances[id]){
            balances[id] = 100;
        }
        callback(balances[id]);
        /*
        input: {
            name: (String),
            public: (boolean),
            payment: (int)
        }
        callback: {
            success: (boolean),
            roomCode (int)
        }
        */
        sock.on("create-room", (gameData, callback) => {
            let roomCode = makeRoomCode();
            if(!gameData.name || !games[gameData.name]){
                callback({
                    success: false
                });
                return;
            }
            if(balances[id] < gameData.payment){
                callback({
                    success: false
                });
                return;
            }
            console.log(id + " created room with code " + roomCode);
            balances[id] -= parseInt(gameData.payment, 10);
            let game = games[gameData.name];
            rooms[roomCode] = {
                game: game,
                gameData: gameData,
                players: [id],
                ready: [id]
            };
            if(gameData.public){
                publicRooms.push(roomCode);
            }
            socks[id].room = roomCode;
            callback({
                success: true,
                roomCode: roomCode
            });
        });
        /*
        input: {
            roomCode: (int),
            ready: (boolean)
        }
        callback: {
            success: (boolean),
            gameData: (Object)
        }
        */
        sock.on("join-room", (input, callback) => {
            let roomCode = input.roomCode;
            console.log(id + " is trying to join room with code " + roomCode);
            let ready = input.ready;
            if(!roomCode){
                callback({
                    success: false
                });
                return;
            }
            let game = rooms[roomCode];
            if(!game){
                callback({
                    success: false
                });
                return;
            }
            if(game.players.length >= game.game.maxPlayers()){
                callback({
                    success: false
                });
                return;
            }
            if(game.players.indexOf(id) >= 0){
                callback({
                    success: false
                });
                return;
            }
            console.log(id + " joined room with code " + roomCode);
            if(ready){
                if(balances[id] < game.gameData.payment){
                    callback({
                        success: false
                    });
                    return;
                }
            }
            socks[id].room = roomCode;
            game.players.push(id);
            callback({
                success: true,
                gameData: game.gameData
            });
            if(ready){
                balances[id] -= parseInt(game.gameData.payment, 10);
                game.ready.push(id);
                checkAllReady(roomCode);
            }
        });
        /*
        input: roomCode (int)
        */
        sock.on("ready", (roomCode) => {
            let game = rooms[roomCode];
            if(!game){
                return;
            }
            if(!game.players[id]){
                return;
            }
            if(game.ready.indexOf(id) >= 0){
                return;
            }
            console.log(id + " readied in room " + roomCode);
            if(balances[id] < game.gameData.payment){
                callback({
                    success: false
                });
                return;
            }
            balances[id] -= parseInt(game.gameData.payment, 10);
            game.ready.push(id);
            checkAllReady(roomCode);
        });
        /*
        callback: balance (int)
        */
        sock.on("get-balance", (nullobj, callback) => {
            let object = nullobj;
            console.log(id + " getting balance");
            callback(balances[id])
        });
        /*
        callback: rooms (Room[])
        */
        sock.on("get-room-list", (nullobj, callback) => {
            console.log(id + " fetched room list");
            let object = nullobj;
            let arr = [];
            for(let i = 0; i < publicRooms.length; i++){
                let roomCode = publicRooms[i];
                let room = rooms[roomCode];
                if(room){
                    let obj = {
                        payment: room.gameData.payment,
                        roomCode: roomCode
                    };
                    if(room.players.length >= room.game.maxPlayers()){
                        continue;
                    }
                    arr.push(obj);
                }
            }
            callback(arr);
        });
        sock.on("disconnect", () => {
            console.log(id + " disconnected");
            let roomCode = socks[id].room;
            if(roomCode){
                let room = rooms[roomCode];
                if(room){
                    remove(room.ready, id);
                    remove(room.players, id);
                }
            }
        });
    });
});

//Checks that a game is ready to be run
function checkAllReady(roomCode){
    let game = rooms[roomCode];
    let players = game.ready;
    if(players.length !== game.game.maxPlayers()){
        return;
    }
    remove(publicRooms, roomCode);
    let inputs = null; //TODO inputs
    let winner = game.game.run(players, inputs);
    console.log(winner + " won the game in " + roomCode);
    balances[winner] += parseInt(game.gameData.payment, 10) * players.length;
    for(let i = 0; i < players.length; i++){
        let player = players[i];
        if(player === winner){
            socks[player].sock.emit("end-game-" + roomCode, {
                win: true,
                roomCode: roomCode,
                balance: balances[player]
            });
        }
        else{
            socks[player].sock.emit("end-game-" + roomCode, {
                win: false,
                roomCode: roomCode,
                balance: balances[player]
            });
        }
    }
    deleteRoom(roomCode);
}

//Generate a random 6-digit room code
function makeRoomCode(){
    return Math.floor(Math.random() * 900000) + 100000;
}

//Helper method to remove an element from an array
function remove(arr, elem){
    let index = arr.indexOf(elem);
    if(index >= 0){
        delete arr[index];
    }
}

//Delete a room based on its room code
function deleteRoom(roomCode){
  let room = rooms[roomCode];
  if(room){
    let players = room.players;
    for(let i = 0; i < players.length; i++){
      let player = players[i];
      delete socks[player].room;
    }
    delete rooms[roomCode];
  }
}


//Start the socket IO server by listening on the specified port
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log('App started on ' + port);
});
