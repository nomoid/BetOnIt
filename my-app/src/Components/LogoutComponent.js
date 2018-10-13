import React, { Component } from 'react';
import { Button, Form, FormGroup, Glyphicon, Well } from 'react-bootstrap';
import '../Styles/Login.css';
//import an auth token from postgresql
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
    //write to the server to logout
  }
  
  logout(e) {
    e.preventDefault();
    //logout from the postgresql
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