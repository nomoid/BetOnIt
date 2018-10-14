import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../Styles/NewGame.css';

class Loading extends Component{
  render() {
    return (
      <div className='Loading'>
        <img src={require('../Images/spin.svg')} />
      </div>
    );
  }
}

export default Loading;
