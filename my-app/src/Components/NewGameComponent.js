import React, { Component } from "react";
import ReactDOM from 'react-dom';

const net = require('../client.js');
const io = net.io;

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {opp: '', bet: ''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({opp: event.target.value});
  }

  handleChange2(event) {
    this.setState({bet: event.target.value});
  }

  handleSubmit(event) {
    
    /*
    name: (String),
            gameID: (int),
            public: (boolean),
            payment: (int)
            */
    io.emit("create-room", {
      name: 'cointoss',
      public: true,
      payment: parseInt(this.state.bet, 10)
    }, (info) => {
      if(info.success){
        alert('Game created with room code ' + info.roomCode);
      }
      else{
        alert('Failed to create game!');
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Room code:
          <input type="text" value={this.state.opp} onChange={this.handleChange1} />
        </label>
        <label>
          Bet amount:
          <input type="text" value={this.state.bet} onChange={this.handleChange2} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default NewGame;
