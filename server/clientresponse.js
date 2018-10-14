const db = require('dbfunction.js');
//const bet = require('bet.js');

class ClientResponse{

    constructor(sock, environment){
        this.sock = sock;
        this.env = environment;
    }

    register(id){
        this.id = id;
        //Message format
        /*
        {
            // (request, response, verify)
            type: (String),
            body: (Object),
            // private information
            input: (Object)
        }
        */
        this.sock.on("message", (message, callback) => {
            try{
                let type = message.type;
                if(!type){
                    throw "No message type.";
                }
                let body = message.body;
                let input = message.input;
                if(type === "request"){
                    callback(this.request(id, body, input));
                }
                else if(type === "response"){
                    callback(this.response(id, body, input));
                }
                else if(type === "verify"){
                    callback(this.verify(id, body, input));
                }
            }
            catch(err){
                callback({
                    response: "server-error"
                });
                console.log("Error reading message: " + err);
            }
        });

        this.sock.on("read-message", (messageID) => {
            db.readMessage(messageID);
        });
    }
    authenticationFailed(){
        this.sock.emit("authentication-failed");
    }

    sendMessage(message){
        this.sock.emit("message", message);
    }

    //Request format
    /*
    input: {
        //Object for game specific information
    }

    body: {
        ownerID (int),
        verifyID (int),
        invitedID (int[]),
        public (boolean),
        betType (String),
        payment (int),
        expectedPayment (int),
        betInfo (Object),
        deadline (long),

        //server generated
        betID (int)
    }

    meta: {
        accepted (int[]),
        responded (int[])
    }
    */
    request(id, body, input){
        let output = {};
        let ownerID = body.ownerID;
        if(id !== ownerID){
            output.response = "authentication-failed";
            return output;
        }

        //Down payment
        let balance = db.getBalance(id);
        if(balance < payment){
            output.response = "insufficient-balance";
            return output;
        } 
        db.setBalance(id, balance - payment);

        let meta = {
            accepted: [id],
            responded: [id],
            playerInput: {}
        };
        meta.playerInput[id] = input;
        let metaID = db.generateMetaID();
        db.addMeta(metaID, meta);
        let betID = db.generateBetID();
        body.betID = betID;
        this.addMessage(body.invitedID, body);
        output.response = "request-successful";
        output.betID = betID;
        return output;
    }
    
    //Response format
    /*
    body: {
        id: (int),
        betID: (int),
        //(accept, reject, modify, ignore, block)
        response: (String),
        responseInfo (Object)
    }
    */
    response(id, body, input){
        let output = {};
        let bet = db.getBody(body.betID);
        if(!bet.invitedID.includes(id)){
            output.response = "authentication-failed";
            return output;
        }
        let meta = db.getMeta(bet.metaID);
        let accepted = meta.accepted;
        let responded = meta.responded;
        let payment = bet.expectedPayment;
        if(!payment){
            payment = bet.payment;
        }
        if(body.response === "accept" || body.response === "reject"){
            if(!responded.includes(id)){
                if(body.response === "accept"){
                    let balance = db.getBalance(id);
                    if(balance < payment){
                        output.response = "insufficient-balance";
                        return output;
                    } 
                    db.setBalance(id, balance - payment);

                    accepted.push(id);
                    meta.playerInput[id] = input;
                    db.addMeta(metaID, meta);
                }
                responded.push(id);
                db.addBody(body.betID, bet);
                checkExecuteBet(bet);
            }
        }
        //TODO implement modify, ignore, block
    }
    
    verify(id, messageID, body){
        let messageID = body.messageID;
        let output = {
            messageID: messageID
        };
        let verifyID = body.verifyID;
        if(id !== verifyID){
            output.response = "authentication-failed";
            return output;
        }
        //TODO

    }

    addMessage(deliverTo, body){
        let connected = this.env.clients;
        db.addBody(body.betID, body);
        for(let i = 0; i < deliverTo.length; i++){
            let message = {
                messageID: db.generateMessageID(),
                body: body
            }
            db.addMessage(message.messageID, body);
            let recipient = deliverTo[i];
            let client = connected[recipient];
            if(client){
                client.sendMessage(message);
            }
        }
    }

    checkExecuteBet(bet){
        if(db.currentTime() > bet.deadline ||
                bet.responded.length == bet.invitedID.length + 1){
            //Everyone invited accepted
            let results = this.play(bet);
            let players = results.players;
            let distribution;
            if(!results.success){
                //Refund everyone
                distribution = results.payments;
            }
            else{
                distribution = results.distribution;
            }
            for(let i = 0; i < players.length; i++){
                let player = players[i];
                this.env.balance[player] += distribution[player];
                let message;
                if(results.success){
                    message = results.messages[player];
                }
                else{
                    //TODO detailed message
                    message = {
                        betID: bet.betID,
                        status: 'bet-failed'
                    };
                }
                this.addMessage(player, message);
            }
        }
    }

    //
    /*
    {
        success: (boolean),
        payments: (Map<int, int>),
        //Amount to give to each player
        distribution: (Map<int, int>),
        messages: (Map<int, object>),
        players: (int[])
    }
    */
    play(bet){
        let output = {
            success: false
        }
        let meta = db.getMeta(bet.metaID);
        //Copy array
        let players = meta.accepted.slice(0);
        let inputs = {};
        let payments = {};
        let otherPayment = bet.expectedPayment;
        if(!otherPayment){
            otherPayment = bet.payment;
        }
        for(let i = 0; i < players.length; i++){
            let player = players[i];
            inputs[player] = meta.playerInput[player];
            payments[player] = otherPayment;
        }
        let owner = bet.ownerID;
        payments[owner] = bet.payment;
        
        output.payments = payments;
        output.players = players;
        //For non two player games, disallow asymmetric payment
        if(players.length != 2 && bet.expectedPayment != bet.payment){
            return output;
        }
        let game = this.env.game[bet.betType];
        if(!game){
            return output;
        }
        //Game does not support number of players
        if(!game.supportsPlayers(players.length)){
            return output;
        }
        //Check distribution to make sure there is no net gain
        let totalPayment = 0;
        for(let i = 0; i < players.length; i++){
            totalPayment += payments[players[i]];
        }
        //Input
        /*
        {
            payment: (int)
            //other fields based on passed in
            ...
        }
        */
       let gameReturn;
        try{
            gameReturn = game.run({
                owner: bet.ownerID,
                players: players,
                inputs: inputs,
                deadline: bet.deadline,
                payments: playments
            });
        }
        catch(err){
            console.log("Error running bet with id: " + bet.id);
            return output;
        }
        let distribution = gameReturn.distribution;
        let messages = gameReturn.messages;
        if(!distribution){
            return output;
        }
        function add(a, b){
            return a + b;
        }
        let totalDistribution = distribution.reduce(add, 0);
        if(totalDistribution > totalPayment){
            return output;
        }
        output.success = true;
        output.distribution = distribution;
        output.messages = messages;
        return output;
    }
}