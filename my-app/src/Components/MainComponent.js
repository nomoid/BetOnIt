import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Flipper, Flipped } from "react-flip-toolkit";
import { Link, Redirect } from 'react-router-dom';
import '../Styles/Main.css';

const io = require('../client.js').io;


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


const ExpandedListItem = ({ tryJoin, room, bet_amount, index, color, onClick }) => {
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
              <div><button onClick={(event) => tryJoin(event, room)}>Submit</button></div>
              </div>
            <div className="additional-content">
              <div className = "join-button"> 
              </div>
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  );
};

//<Link to="/coin">join game</Link>
class Main extends Component {

  

  constructor(){
    super();
    console.log("Initialize");
    this.state = {
      listData: [...Array(0).keys()],
      bets: [],
      rooms: [],
      focused: null,
      credit: 0,
      doRedirect: false
    };
    io.on("connect", () => {
      io.emit("initialize", {
        id: Math.floor(Math.random() * 1000) //TODO
      }, (balance) => {
        this.state.credit = balance;
        io.emit("get-room-list", null, (list) => {
          console.dir(list);
          this.state.listData = [...Array(list.length).keys()];
          this.state.rooms = [];
          this.state.bets = [];
          for(let i = 0; i < list.length; i++){
            let roomCode = list[i].roomCode;
            let payment = list[i].payment;
            this.state.rooms.push(roomCode);
            this.state.bets.push(payment);
          }
          this.forceUpdate(() => {
            console.log("Done updating")
          });
        });
      });
    })
  }

  tryJoin = (event, room) => {
    io.emit("join-room", {
      roomCode: room,
      ready: false
    }, (result) => {
      if(result.success){
        console.log("Success");
        this.setState({doRedirect: true});
      }
      else{
        alert("Room joined failed!");
      }
    });
    event.stopPropagation(); 
  }
  
  onClick = index =>
    this.setState({
      focused: this.state.focused === index ? null : index
    });
    
  render() {
    if(this.state.doRedirect){
      this.state.doRedirect = false;
      return <Redirect push to="/coin" />;
    }
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
          {this.state.listData.map(index => {
            return (
              <li>
                {index === this.state.focused ? (
                  <ExpandedListItem
                    tryJoin={this.tryJoin}
                    room={this.state.rooms[index]}
                    bet_amount={this.state.bets[index]}
                    index={this.state.focused}
                    color={colors[this.state.focused % colors.length]}
                    onClick={this.onClick}
                  />
                ) : (
                  <ListItem
                  room={this.state.rooms[index]}
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
