import openSocket from 'socket.io-client';

const io = openSocket();

module.exports = {
    io: io
};