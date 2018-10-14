import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import { Router } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Game from './Components/CoinComponent';
import Table from './Components/HistoryComponent';
import Page from './Components/PageComponent';

// server.js

const User    = require('./app/models/user.js')
var   express = require('express');
var   app     = express();
const http    = require('http')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const server = http.createServer(app)
app.post('/signup', User.signup)
// app.post('/signin', User.signin)

const port = 3000;
server.listen(port, () => {
  console.log("Server started on port " + port);
})

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Page} />
      <Route path="/coin" component={Game} />
      <Route path="/table" component={Table} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
