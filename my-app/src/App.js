/*
 * Container for frontend web application
 */

import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Components/PageComponent';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
      // check if our user is in the database, implement the backend
      

  }

  render() {
    return (
      <main>
        <Page />
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
