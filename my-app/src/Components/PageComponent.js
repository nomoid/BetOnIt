import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../Styles/Page.css';
import CenterView from './CenterView';
import Login from './LoginComponent';
import Logout from './LogoutComponent';
import Signup from './SignupComponent';
import Game from './CoinComponent';
import Table from './HistoryComponent';
import Main from './MainComponent';
//import Navigate from './Navigate';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { firebase } from '../Firebase';

class PageComponent extends Component{

    constructor(){
        super();
        this.state = {};
        firebase.auth.onAuthStateChanged( authUser => {
            console.log("State changed");
            if(authUser){
            this.setState({authUser: authUser});
            }
            else{
            this.setState({authUser: null});
            }
        });
    }

    render(){
        return <div>
            { this.state.authUser ? <PageAuth authUser={this.state.authUser} /> : <PageNonAuth /> }
        </div>;
    }
}


const PageNonAuth = () =>
    <div className="Page">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <h1 className="Page-title">Bet On It</h1>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav pullRight>
              <Login></Login>

            </Nav>
        </Navbar>

        <div className="container">
            <CenterView>
              <div className="textbox"> </div>
              <Signup ></Signup>
            </CenterView>
            <div className="textbox"> " You Won't " </div>
        </div></div>


const PageAuth = ({authUser}) =>
    <div className="Page">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <h1 className="Page-title">Bet On It</h1>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav pullRight>
              <Logout authUser={authUser} ></Logout>
            </Nav>
        </Navbar>

        <div className="container">
            <CenterView>
                <Main authUser={authUser}></Main>
            </CenterView>
        </div>
    </div>
export default PageComponent;
