/*workflow:

If opponent is logged in, they see the responses immediately. Otherwise,
they see the responses the next time they log in

A invites B to bet
bet: {
    betID: 100 (int)
    ownerID: 123, (int)
    verifyID: 0, (int, 0 = no middleman)
    invitedID: [456], (int[])
    public: false, (boolean)
    betType: "coin", (String from valid types)
    downPayment: 100, (int)
    requestedDownPayment: [100], (int)
    betInfo: { (Object)

    },
    deadline: 1539443028884 (UNIX time)
}

B receives bet info next time he/she logins
B can send an accept or reject request.
Upon a modify request, bet bounces back to "owner"
In a case of more than two 
betResponse: {
    betID: 100, (int)
    response: "modify", (accept, reject, modify, ignore, block)
    responseInfo: {
        downPayment: 50,
        requestedDownPayment: 
    }
}

When B sends response, backend processes bet, 
potentially sends a "delayed bet request".
If middleman is requested, 

delayedBetRequest:{
    betID: 100, (int)
    checkTime: 1539443028884
}

When bet finishes processing, send frontend results

betResults: {
    betID: 100,
    win: true (boolean)
}
*/

function request(id, body){

}

function response(id, body){

}

function verify(id, body){
    let messageID = body.messageID;
    let verifyID = body.verifyID;
    if(id !== verifyID){
        return {
            messageID: messageID,
            response: "verify-failed"
        };
    }

}