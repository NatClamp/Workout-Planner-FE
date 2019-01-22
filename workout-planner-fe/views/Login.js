import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default class Login extends Component {
	state = {
		username: '',
		password: '',
		toRegister: false
	};
	render() {
		return (
			<View style={styles.container}>
				<Text>Logo Placeholder</Text>
				<TextInput
					style={styles.input}
					placeholder='Username'
					onChangeText={(text) => this.setState({ username: text })}
					value={this.state.username}
				/>
				<TextInput
					style={styles.input}
					placeholder='Password'
					onChangeText={(text) => this.setState({ password: text })}
					value={this.state.password}
				/>
				<TouchableOpacity style={styles.submitButton} title='Submit' onPress={this.props.onUserLogin}>
					<Text>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingBottom: '45%',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#D3D3D3'
	},
	input: {
		width: '80%',
		padding: 10,
		fontSize: 24,
		borderColor: 'black',
		borderWidth: 1,
		margin: 10,
		borderRadius: 20,
		color: 'black',
		backgroundColor: 'white'
	},
	submitButton: {
		padding: 10,
		margin: 10,
		fontSize: 24,
		backgroundColor: 'powderblue'
	}
});
