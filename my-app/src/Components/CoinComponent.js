import React from 'react';
import ReactDOM from 'react-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
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
      flip: ' ',
      msg: null,
      tails: 0,
      heads: 0,
      counter: ' '
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
    this.setState({flip: value});
    this.setState({msg: 'The flip is ' + (rand < 0.5 ? 'heads' : 'tails')});
    if (value === 'H') {
      this.setState({heads: this.state.heads + 1})
    }
    else {
      this.setState({tails: this.state.tails + 1})
    }
    this.setState({counter: 'Tails: ' + this.state.tails + ', Heads: ' + this.state.heads});
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
        <div className="status">{this.state.counter}</div>
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
