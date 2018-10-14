/*
 * Functionality for initializing the socket.io client on the frontend
 */

let io = require('socket.io-client')('http://bet-on-it-umass.herokuapp.com');

module.exports = {
    io: io
};