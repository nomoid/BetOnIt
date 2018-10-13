import React from 'react';
import ReactDOM from 'react-dom';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './index.css';

class Coin extends React.Component {
  render() {
    return (
      <button
      className="circle"
      onClick={() => this.props.onClick()}
      >
        <Flippy
          flipOnClick={true} // default false
          flipDirection="horizontal" // horizontal or vertical
          ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
          // if you pass isFlipped prop component will be controlled component.
          // and other props, which will go to div
          onClick={() => this.props.onClick()}
        >
          <FrontSide
            style={{ backgroundColor: '#41669d',
                    width: '130px', height: '130px', borderRadius: '50%'}}>
            {this.props.value}
          </FrontSide>
          <BackSide
            style={{ backgroundColor: '#175852',
                    width: '130px', height: '130px', borderRadius: '50%'}}>
            {this.props.value}
          </BackSide>
        </Flippy>
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: ' ',
      msg: null,
    };
  }

  handleClick() {
    const rand = Math.random();
    const value = rand < 0.5 ? '0' : '1';
    this.setState({flip: value});
    this.setState({msg: 'The flip is ' + (value < 0.5 ? 'heads' : 'tails')})
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
