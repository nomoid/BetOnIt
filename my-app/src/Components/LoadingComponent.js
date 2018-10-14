import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../Styles/NewGame.css';
import { Redirect } from 'react-router';

const io = require('../client.js').io;

class Loading extends Component{

  constructor(){
    super();
    this.state = {};
  }

  render() {
    if(!this.state.loaded){
      console.log("Registered end");
      this.state.loaded = true;
      io.on("end-game-" + this.props.location.state.roomCode, (end) => {
        this.setState({redirect: true, info: end});
      });
    }
    if(this.state.redirect){
      return <Redirect push to={{
        pathname: "/coin",
        state: {
          info: this.state.info
        }
      }} />;
    }
    return (
      <div className='Loading'>
        <img src={require('../Images/spin.svg')} />
      </div>
    );
  }
}

export default Loading;
