import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Flipper, Flipped } from "react-flip-toolkit";
import { Link } from 'react-router-dom';
import '../Styles/Main.css';


const colors = ["#A4C3B2", "#6B9080", "#545C52"];

const shouldFlip = index => (prev, current) =>
  index === prev || index === current;

const ListItem = ({ room, index, color, onClick }) => {
  return (
    <Flipped
      flipId={`listItem-${index}`}
      stagger="card"
      shouldInvert={shouldFlip(index)}
    >
      <div className="listItem"
           style={{ backgroundColor: color }}
           onClick={() => onClick(index)}>
        <Flipped inverseFlipId={`listItem-${index}`}>
          <div className="listItemContent">
            <Flipped
              flipId={`avatar-${index}`}
              stagger="card-content"
              shouldFlip={shouldFlip(index)}
            >
              <div className="avatar" />
            </Flipped>
            <div className="description">
             Room {room}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

const ExpandedListItem = ({ bet_amount, index, color, onClick }) => {
  return (
    <Flipped
      flipId={`listItem-${index}`}
      stagger="card"
      onStart={el => {
        setTimeout(() => {
          el.classList.add("animated-in");
        }, 400);
      }}
    >
      <div className="expandedListItem"
           style={{ backgroundColor: color }}
           onClick={() => onClick(index)}>
        <Flipped inverseFlipId={`listItem-${index}`}>
          <div className="expandedListItemContent">
            <Flipped flipId={`avatar-${index}`} stagger="card-content">
              <div className="avatar avatarExpanded">
                <img src={require('../Images/coin.svg')} />
              </div>
            </Flipped>
            <div className="description">
              Coin Flip
              <div className="bet-summary">Current bet:</div>
              <div className="bet-summary">${bet_amount}</div>
              </div>
            <div className="additional-content">
              <div className = "join-button"> <Link to="/coin">join game</Link></div>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

class Main extends Component {

  

  constructor(){
    this.listData = [...Array(7).keys()];
    this.bets = ['50', '640', '450', '10', '200', '150', '130']
    this.rooms = ['123141', '531412', '213141', '064834', '234591', '932914', '322512']
    this.state = {
      focused: null,
      credit: 0
    };
    const io = require('../client.js');
    io.on("connection", () => {
      io.emit("initialize", {
        id: 5 //TODO
      }, (balance) => {
        this.state.credit = balance;
        io.emit("get-room-list", (list) => {
          this.listData = [...Array(list.length).keys()];
          this.rooms = [];
          this.bets = [];
          for(let i = 0; i < list.length; i++){
            let roomCode = list[i].roomCode;
            let payment = list[i].payment;
            this.rooms.push(roomCode);
            this.bets.push(payment);
          }
          this.forceUpdate(() => {

          });
        });
      });
    })
  }
  
  onClick = index =>
    this.setState({
      focused: this.state.focused === index ? null : index
    });
  render() {
    return (
      <Flipper
        flipKey={this.state.focused}
        className="staggered-list-content"
        spring="gentle"
        staggerConfig={{
          card: {
            reverse: this.state.focused !== null,
            speed: 0.5
          }
        }}
        decisionData={this.state.focused}
      >
        <div className = "Main">
          <div className="stickyheader">
            <Link to="/profile">Profile</Link>
            {'\n'}________________________;
            <Link to="/new">New Game</Link>
            <div className="credit">Credit: ${this.state.credit}</div>
          </div>
          <div className="spacer"> </div>
        <ul className="list">
          {this.listData.map(index => {
            return (
              <li>
                {index === this.state.focused ? (
                  <ExpandedListItem
                    bet_amount={this.bets[index]}
                    index={this.state.focused}
                    color={colors[this.state.focused % colors.length]}
                    onClick={this.onClick}
                  />
                ) : (
                  <ListItem
                  room={this.rooms[index]}
                  index={index}
                  key={index}
                  color={colors[index % colors.length]}
                  onClick={this.onClick} />
                )}
              </li>
            );
          })}
        </ul>
        </div>
      </Flipper>
    );
  }
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<AnimatedList />, rootElement);


export default Main;
