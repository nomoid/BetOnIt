import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import '../Styles/Login.css';
import { auth } from '../Firebase';

class LoginComponent extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value 
    });
  }
  
  login(e) {
    e.preventDefault();
    auth.doLoginWithEmailAndPassword(this.state.email,this.state.password)
    .catch(function(error){
        // handle errors
        var code = error.code;
        var message = error.message;
        console.log(code);
        console.log(message);
    }); 
  }
    
  render() {
    return (
      <div className="Login">
        <Form inline onSubmit={this.login}>
            <FormGroup>
                <FormControl type="text" placeholder="Email" onChange={this.handleChange} name="email" />
            </FormGroup>{' '}
            <FormGroup>
                <FormControl type="password" placeholder="Password" onChange={this.handleChange} name="password" />
            </FormGroup>{' '}
            <FormGroup>
                <Button type="submit" ><Glyphicon glyph="log-in" /> Login</Button>
            </FormGroup>
        </Form>
      </div>
    );
  }
}

export default LoginComponent;