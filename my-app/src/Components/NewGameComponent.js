import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import '../Styles/NewGame.css';

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
    alert('Game created with ' + this.state.opp + ', ' + this.state.bet);
    this.setState({redirect: true});
    event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/loading" />;
    }
    return (
      <div className='Forms'>
      <form onSubmit={this.handleSubmit}>
        <div><label>
          Room code: { }
          <input type="text" value={this.state.opp} onChange={this.handleChange1} />
        </label></div>
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
