// TODO polish signin()
// 
import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Glyphicon, Panel } from 'react-bootstrap';
import '../Styles/Signup.css';
//import auth from postgresql

class SignupComponent extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email   : '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.signup       = this.signup.bind(this);
 
    }
    
    handleChange(e){
        this.setState({
           [e.target.name]: e.target.value
        });
    }
  
    signup(e) {
        e.preventDefault();
        fetch("http://localhost:8080/signup", {
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
        .then((response) => {
            return response.json();
        })
        // output here, if no error, is the user's metadata
        .then((json) => {
            console.log(JSON.stringify(json));
            localStorage.setItem('token', json.token);
            localStorage.setItem('id', json.id);
        });
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