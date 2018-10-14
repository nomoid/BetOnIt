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


const PageComponent = ({authUser}) =>
    <div>
        { authUser ? <PageAuth authUser={authUser} /> : <PageNonAuth /> }
    </div>

const PageNonAuth = () =>
    <div className="Page">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <h1 className="Page-title">React Web Application</h1>
                    <Router>
                    <div>
                        <li>
                            <a href="/coin">Coin Flip</a>
                        </li>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/main">Main</a>
                        </li>
                    </div>
                    </Router>
                </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav pullRight>
              <Login></Login>

            </Nav>
        </Navbar>

        <div className="container">
            <CenterView>
              <Signup ></Signup>
            </CenterView>
        </div>
    </div>

const PageAuth = ({authUser}) =>
    <div className="Page">
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <h1 className="Page-title">React Web Application</h1>
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
