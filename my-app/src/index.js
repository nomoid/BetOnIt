import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Coin extends React.Component {
  render() {
    return (
      <button className="circle" onClick={function() { alert('click'); }}>
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderCoin(i) {
    return <Coin />;
  }

  render() {
    const status = 'Click to flip the coin';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderCoin(0)}
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
