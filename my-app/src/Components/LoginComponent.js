import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import '../Styles/Login.css';
//import auth from postgresql
class LoginComponent extends Component {
    
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.login        = this.login.bind(this);
  }
  
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  
  login(e) {
    e.preventDefault();
    fetch("http://localhost:8080/signin", {
      method : "POST",
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })

    })
    // output here, if no error, is the user's metadata
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(JSON.stringify(json));
      localStorage.setItem('token', json.token);
      localStorage.setItem('id', json.id);
    });
  }
    
  render() {
    return (
      <div className="Login">
        <Form inline onSubmit={this.login}>
            <FormGroup>
                <FormControl type="text" placeholder="Username" onChange={this.handleChange} name="username" />
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