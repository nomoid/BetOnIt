import React, { Component } from "react";
import ReactDOM from 'react-dom';

let net = require("../network.js")
let io = net.io

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

  /*
        type: (String),
        body: (Object),
        // private information
        input: (Object)

        ownerID (int),
        #verifyID (int),
        invitedID (int[]),
        public (boolean),
        betType (String),
        payment (int),
        expectedPayment (int),
        betInfo (Object),
        deadline (long),

        //server generated
        betID (int)
  */
  handleSubmit(event) {
    //alert('Game created with ' + this.state.opp + ', ' + this.state.bet);
    io.emit("message", {
      type: 'request',
      body: {
        ownerID: net.id,
        invitedID: parseInt(this.state.opp, 10),
        betType: "cointoss",
        payment: parseInt(this.state.bet, 10),
        deadline: Number.MAX_SAFE_INTEGET
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Opponent id:
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
