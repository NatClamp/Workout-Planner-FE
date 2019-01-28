import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class SuccessfulRegister extends Component {
	render() {
		return (
			<View>
				<Text> Congratulations on signing up with curlFriend </Text>
				<View>
					<Button title='Proceed to the Home Page' onPress={() => this.props.navigation.navigate('Home')} />
				</View>
			</View>
		);
	}
}
