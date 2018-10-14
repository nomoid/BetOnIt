let io = require('socket.io-client')('https://bet-on-it-umass.herokuapp.com:8080');

module.exports = {
    io: io
};