const db = require('dbfunction.js');
//const bet = require('bet.js');

class ClientResponse{

    constructor(sock, environment){
        this.sock = sock;
        this.env = environment;
    }

    register(id){
        this.id = id;
        this.sock.on("message", (message, callback) => {
            try{
                let type = message.type;
                if(!type){
                    throw "No message type.";
                }
                let body = message.body;
                if(type === "request"){
                    callback(this.request(id, body));
                }
                else if(type === "response"){
                    callback(this.response(id, body));
                }
                else if(type === "verify"){
                    callback(this.verify(id, body));
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
    body: {
        ownerID (int),
        verifyID (int),
        invitedID (int[]),
        public (boolean),
        betType (String),
        downPayment (int),
        requestedDownPayment (int[]),
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
    request(id, body){
        let output = {};
        let ownerID = body.ownerID;
        if(id !== ownerID){
            output.response = "authentication-failed";
            return output;
        }
        let meta = {
            accepted: [id],
            responded: [id]
        };
        let metaID = db.generateMetaID();
        db.addBody(metaID, meta);
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
    response(id, messageID, body){
        let output = {};
        let bet = db.getBody(body.betID);
        if(!bet.invitedID.includes(id)){
            output.response = "authentication-failed";
            return output;
        }
        let meta = db.getBody(bet.metaID);
        let accepted = meta.accepted;
        let responded = meta.responded;
        if(body.response === "accept"){
            if(!responded.includes(id)){
                accepted.push(id);
                responded.push(id);
                db.addBody(body.betID, bet);
                checkExecuteBet(bet);
            }
        }
        else if(body.respone === "reject"){
            if(!responded.includes(id)){
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
            db.addMessage(message.messageID, body.betID);
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
            
        }
    }
}