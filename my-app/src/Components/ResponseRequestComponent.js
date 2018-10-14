import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../Styles/Request.css';

class ResponseRequest extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render(){
        var msg;
        if(!this.state.isHidden){
            msg = <div className="Request">
              Would u like to play a game lol
              <button>
                <Link to="/coin">YES</Link>
              </button>
              <button onClick={this.toggleHidden.bind(this)} >
                NO
              </button>
            </div>
        }
        else{
            msg = <div></div>
        }
        return (
            <div>
                {msg}
           </div>
        );
    }
}

export default ResponseRequest
