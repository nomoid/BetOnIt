/*const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);*/

let db = {
    usersByName = {},
    users = {},
    bodies = {},
    metas = {},
    messages = {}
};

function authenticate(username, token){
    //TODO
    return true;
}

function register(username){
    let id = generateUserID();
    users[id] = username;
    usersByName[username] = id;
}

function getMessagesForUser(id){
    //TODO function stub
}

function getID(username){
    return usersByName[username];
}

function addBody(bodyID, body){
    db.bodies[bodyID] = body;
}

function getBody(bodyID){
    return db.bodies[bodyID];
}

function addMeta(metaID, meta){
    db.metas[metaID] = meta;
}

function getMeta(metaID){
    return db.metas[metaID];
}

function addMessage(messageID, body){
    db.messages[messageID] = body;
}

function getMessage(messageID){
    return db.messages[messageID];
}

//Change "new" to "non-new"
function readMessage(messageID){
    db.messages[messageID].read = true;
}

function deleteMessage(messageID){
    delete db.messages[messageID];
}

function getBalance(id){
    return db.balance[id];
}

function setBalance(id, balance){
    db.balance[id] = balance;
}

//Temporary
function generateID(){
    return Math.random() * 1000000000;
}

function generateBodyID(){
    return generateID();
}

function generateMessageID(){
    return generateID();
}

function generateBetID(){
    return generateID();
}

function generateMetaID(){
    return generateID();
}

function generateUserID(){
    return generateID();
}

function currentTime(){
    return new Date().getTime();
}