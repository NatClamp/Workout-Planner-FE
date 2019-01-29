import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class OpeningScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Button title='Profile' onPress={() => this.props.navigation.navigate('Profile')} />
				<Button title='Home' onPress={() => this.props.navigation.navigate('Home')} />
				<Button title='Saved Workouts' onPress={() => this.props.navigation.navigate('SavedWorkouts')} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
