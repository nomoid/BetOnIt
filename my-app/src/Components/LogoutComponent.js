/*
 * Markus Feng, Alex Han, Jian Lu, Tongyu Zhou
 * (c) 2018
 * 
 * The logout component handles the process of logout in a user
 * by accessing the Firebase database and checking for the existence.
 */


import React, { Component } from 'react';
import { Button, Form, FormGroup, Glyphicon, Well } from 'react-bootstrap';
import '../Styles/Login.css';
import { auth, db } from '../Firebase';

class LogoutComponent extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      username: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  componentDidMount(){
    var users = db.getUserRef(this.props.authUser.uid);
    users.once('value')
    .then( (snapshot) => {
        this.setState({ username: snapshot.val().username });
    }).catch(function(error){
        var code = error.code;
        var message = error.message;
        console.log("Failed to set username: " + message + "(" + code + ")" );
    });  
  }
  
  logout(e) {
    e.preventDefault();
    //logout from the postgresql
    auth.doLogout().catch(function(error){
        // handle errors
        var code = error.code;
        var message = error.message;
        console.log("Failed to logout: " + message + "(" + code + ")" );
    });
  }
   
  render() {
    const custom = {
        margin: 0,
    };
    return (
      <div className="Login">
        <Form inline onSubmit={this.logout}>
            <FormGroup>
                <Well bsSize="small" style={custom}>Welcome, {this.state.username} </Well>
            </FormGroup>{' '}
            <FormGroup>
                <Button type="submit" ><Glyphicon glyph="log-out" /> Logout</Button>
            </FormGroup>
        </Form>
      </div>
    );
  }
}

export default LogoutComponent;