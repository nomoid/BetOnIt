// server.js

const User    = require('./app/models/user.js')
var   express = require('express');
var   app     = express();
const http    = require('http')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const server = http.createServer(app)
app.post('/signup', User.signup)

const port = 3000;
server.listen(port, () => {
    console.log("Server started on port " + port);
})
// module.exports = app;
