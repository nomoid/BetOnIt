import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Navigate extends Component {

	render(){
		<Button 
			title="coingame">
			onPress={() =>this.props.navigation.navigate('coin.js')}/>
	};
}