import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Glyphicon, Panel } from 'react-bootstrap';
import '../Styles/Signup.css';
//import auth from postgresql

class SignupComponent extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
 
    }
    
    handleChange(e){
        this.setState({
           [e.target.name]: e.target.value 
        });
    }
  
    signup(e){
        e.preventDefault();
        /*Write a try catch to do use logic to sign up 
        and put a user into the database, console log otherwise*/
    }
    
  render() {
    return (
        <Panel>
            <Panel.Heading>Sign Up!</Panel.Heading>
            <Panel.Body>
                <Form onSubmit={this.signup}>
                    <FormGroup bsSize="large">
                        <FormControl type="text" placeholder="Username" onChange={this.handleChange} name="username" />
                    </FormGroup>{' '}
                    <FormGroup bsSize="large">
                        <FormControl type="text" placeholder="Email" onChange={this.handleChange} name="email" />
                    </FormGroup>{' '}
                    <FormGroup bsSize="large">
                        <FormControl type="password" placeholder="Password" onChange={this.handleChange} name="password" />
                    </FormGroup>{' '}
                    <FormGroup bsSize="large">
                        <Button type="submit" ><Glyphicon glyph="log-in" /> Signup</Button>
                    </FormGroup>
                </Form>
            </Panel.Body>
        </Panel>
    );
  }
}

export default SignupComponent;