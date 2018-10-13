import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Coin extends React.Component {
  render() {
    return (
      <button
      className="circle"
      onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: null,
      msg: null,
    };
  }

  handleClick() {
    const rand = Math.random();
    const value = rand < 0.5 ? '0' : '1';
    this.setState({flip: value});
    this.setState({msg: 'The flip is ' + (value == 1 ? 'heads' : 'tails')})
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
        <div className="board-row">
          {this.renderCoin(0)}
        </div>
        <div className="status">{flip_result}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
