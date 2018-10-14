// server.js

const User    = require('./app/models/user.js')
var   express = require('express');
var   app     = express();
const http    = require('http')

// allows front/backend to run from single port
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const server = http.createServer(app)
app.post('/signup', User.signup)
app.post('/signin', User.signin)

const port = 8080;
server.listen(port, () => {
    console.log("Server started on port " + port);
})

