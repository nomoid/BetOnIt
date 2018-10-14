import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import '../Styles/NewGame.css';

const net = require('../client.js');
const io = net.io;

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opp: '',
      bet: '',
      redirect: false
    };

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
    let value = parseInt(this.state.bet, 10);
    if(value <= 0){
      alert('Invalid bet input!');
      return;
    }
    /*
    name: (String),
            gameID: (int),
            public: (boolean),
            payment: (int)
            */
    io.emit("create-room", {
      name: 'cointoss',
      public: true,
      payment: value
    }, (info) => {
      if(info.success){
        alert('Game created with room code ' + info.roomCode);
        this.setState({redirect: true, roomCode: info.roomCode});
      }
      else{
        alert('Failed to create game!');
      }
    });
    event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: "/loading",
        state: {
          roomCode: this.state.roomCode
        }
      }} />;
    }
    return (
      <div className='Forms'>
      <form onSubmit={this.handleSubmit}>
        <div><label>
          Bet amount: { }
          <input type="text" value={this.state.bet} onChange={this.handleChange2} />
        </label></div>
        <div className='Enter'><input type="submit" value="Submit" /></div>
      </form>
      </div>
    );
  }
}


export default NewGame;
