import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../Styles/Profile.css';
import CenterView from './CenterView';
import Table from './HistoryComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//Database setup functionality


class Profile extends Component{

	constructor(props){
		super(props);


		this.state = {
			/*Table history to fill in*/

		};

		/*
		TODO :
		Include a table for the match history, 
		include a global leaderboard, 
		*/

	}

	componentWillMount(){
		/*Load in the state of the data referenced by our database*/.
	}

	render(){
		return()
		<div>
		</div>
	}


}

export default ProfileDisplay;