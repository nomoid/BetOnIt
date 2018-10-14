/*
 * Markus Feng, Alex Han, Jian Lu, Tongyu Zhou
 * (c) 2018
 * 
 * This is the front end for the coin flipping game. We utilize flippy 
 * in order get a single flip. We continue to edit key frames to get multiple 
 * rotations.
 */


import React from 'react';
import ReactDOM from 'react-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Link } from 'react-router-dom';
import '../Styles/Coin.css';

class Coin extends React.Component {
  render() {
    return (
      <div
      className="circle"
      onClick={() => this.props.onClick()}
      >
        <Flippy
          flipOnClick={true} // default false
          flipDirection="horizontal" // horizontal or vertical
          onClick={() => this.props.onClick()}
        >
          <FrontSide
            style={{ backgroundColor: '#d9a760',
                    width: '130px', height: '130px', borderRadius: '50%'}}>
            {this.props.value}
          </FrontSide>
          <BackSide
            style={{ backgroundColor: '#ca8b30',
                    width: '130px', height: '130px', borderRadius: '50%'}}>
            {this.props.value}
          </BackSide>
        </Flippy>
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      win: props.win,
      balance: props.balance,
      flip: ' ',
      msg: null,
      tails: 0,
      heads: 0,
      counter: ' ',
      showing: false
    };
  }

  handleClick() {
    let rand;
    if(this.state.win){
      rand = 0.25;
    }
    else{
      rand = 0.75;
    }
    const value = rand < 0.5 ? 'H' : 'T';
    let end_msg = '';
    this.setState({flip: value});
    this.setState({msg: 'The flip is ' + (rand < 0.5 ? 'heads' : 'tails')});
    if (value === 'H') {
      this.setState({heads: this.state.heads + 1})
      end_msg = `You win! Your new balance is $`;
    }
    else {
      this.setState({tails: this.state.tails + 1})
      end_msg = `You lose! Your new balance is $`;
    }
    this.setState({showing: true})
    this.setState({end_msg: end_msg + this.state.balance});
  }

  renderCoin(i) {
    return <Coin
      value={this.state.flip}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Click to flip the coin';
    const flip_result = this.state.msg;

    return (
      <div>
        <div className="status">{status}</div>
          {this.renderCoin(0)}
        <div className="status">{flip_result}</div>
        <div className="status">{this.state.end_msg}</div>
        <div className="back">
          { this.state.showing ? <div><Link to={{
            pathname: "/",
            state: {
              refresh: true
            }
          }}>Go Back</Link></div> : null}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            win={this.props.location.state.info.win}
            balance={this.props.location.state.info.balance}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

//ReactDOM.render(
//  <Game />,
//  document.getElementById('root')
//);

export default Game;
