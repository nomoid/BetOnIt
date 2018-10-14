import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Components/PageComponent';
import { firebase } from './Firebase';
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';

//window.jQuery = require('jquery');
//require('bootstrap');

/*
TODO list:

*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
      // check if our user is in the database, implement the backend
      firebase.auth.onAuthStateChanged( authUser => { authUser ? this.setState({authUser}) : this.setState({authUser: null}); } );

  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
            /*<Router>
                <div>
                    <Page authUser={this.state.authUser} />
                </div>
            </Router>*/
    );
  }
}

export default App;
