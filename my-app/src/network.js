const io = require('socket.io');

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

let socks = {

};

let rooms = {
    
};

let publicRooms = [];

let balances = {

};

io.on("connection", (sock) => {
    /*
    {
        id: (int)
    }
    */
    sock.on("initialize", (info) => {
        let id = info.id;
        socks[id] = {
            sock: sock
        };
        if(!balances[id]){
            balances[id] = 100;
        }
        /*
        {
            name: (String),
            gameID: (int),
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
            balances[id] -= gameData.payment;
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
            gameData: (Object),
        }
        */
        sock.on("join-room", (input, callback) => {
            let roomCode = input.roomCode;
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
                return;
            }
            socks[id].room = roomCode;
            game.players.push(id);
            callback({
                success: true,
                gameData: game.gameData
            });
            if(ready){
                game.ready.push(id);
                checkAllReady(game);
            }
        });
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
            game.ready.push(id);
            checkAllReady(game);
        });
        sock.on("get-open-room-list", (obj, callback) => {
            let arr = [];
            for(let i = 0; i < publicRooms.length; i++){
                let room = rooms[publicRooms[i]];
                if(room){
                    arr.push(room);
                }
            }
            callback(arr);
        });
        sock.on("disconnect", () => {
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

function checkAllReady(game){
    let players = game.ready;
    if(players.length !== game.game.maxPlayers()){
        return;
    }
    let roomCode = game.roomCode;
    remove(publicRooms, roomCode);
    let winner = game.game.run();
    balances[winner] += game.gameData.payment * players.length;
    for(let i = 0; i < players.length; i++){
        let player = players[i];
        if(player === winner){
            socks[player].sock.emit("win-game", {
                roomCode: roomCode,
                balance: balances[player]
            });
        }
        else{
            socks[player].sock.emit("lose-game", {
                roomCode: roomCode,
                balance: balances[player]
            });
        }
    }
    deleteRoom(roomCode);
}

function makeRoomCode(){
    return Math.floor(Math.random() * 900000) + 100000;
}

function remove(arr, elem){
    let index = arr.indexOf(elem);
    if(index >= 0){
        delete arr[index];
    }
}