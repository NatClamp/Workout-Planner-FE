import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class CompletionModal extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text style={{ textAlign: 'center', paddingTop: 50 }}>Congrats!!!</Text>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'center',
						paddingTop: 30
					}}
				>
					<Button title='Home' onPress={() => this.props.navigation.navigate('Home')} />
					<Button title='Review your workout' onPress={() => this.props.navigation.navigate('UserProfile')} />
				</View>
			</View>
		);
	}
}
