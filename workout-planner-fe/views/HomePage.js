import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Model from '../components/Model';
import ExerciseList from '../components/ExerciseList';

export default class HomeScreen extends React.Component {
	state = {
		muscles: []
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model />
				</View>
				<ScrollView style={{ flex: 1 }}>
					<ExerciseList muscles={this.state.muscles} />
					<Button
						style={{ flex: 1, marginTop: 10, backgroundColor: 'blue' }}
						title='Workout Preview'
						onPress={() => this.props.navigation.navigate('WorkoutPreview')}
					/>
				</ScrollView>
			</View>
		);
	}
	componentDidMount() {
		return fetch('http://192.168.230.34:9000/api/muscles')
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState(
					{
						muscles: responseJson.muscles
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
}
