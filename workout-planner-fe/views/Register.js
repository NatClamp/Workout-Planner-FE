import React from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class Register extends React.Component {
	state = {
		user_name: '',
		actual_name: '',
		isFemale: false
	};
	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	render() {
		const radio_props = [ { label: 'Male', value: false }, { label: 'Female', value: true } ];
		return (
			<View style={styles.container}>
				<Text>Register with curlFriend</Text>

				<TextInput
					style={styles.input}
					placeholder='Username...'
					autoCapitalize='none'
					placeholderTextColor='white'
					onChangeText={(val) => this.onChangeText('user_name', val)}
				/>
				<TextInput
					style={styles.input}
					placeholder='Name...'
					autoCapitalize='none'
					placeholderTextColor='white'
					onChangeText={(val) => this.onChangeText('actual_name', val)}
				/>
				<RadioForm
					radio_props={radio_props}
					initial={0}
					onPress={(value) => {
						this.setState({ isFemale: value });
					}}
				/>
				<Button title='Sign Up' onPress={this.addToUsers} />
			</View>
		);
	}
	addToUsers = () => {
		axios
			.post(`${URL}/users`, {
				user_name: this.state.user_name,
				actual_name: this.state.actual_name,
				isFemale: this.state.isFemale
			})
			.then(() => {
				this.props.navigation.navigate('SuccessfulRegister');
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

const styles = StyleSheet.create({
	input: {
		width: 250,
		height: 55,
		backgroundColor: '#42A5F5',
		margin: 10,
		padding: 8,
		color: 'white',
		borderRadius: 14,
		fontSize: 18,
		fontWeight: '500'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
