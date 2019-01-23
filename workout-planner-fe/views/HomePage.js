import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Model from '../components/Model';
import ExerciseList from '../components/ExerciseList';

export default class HomeScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model />
				</View>
				<View style={{ flex: 1 }}>
					<ExerciseList />
					<Button
						style={{ flex: 1, marginTop: 10, backgroundColor: 'blue' }}
						title='go'
						onPress={() => this.props.navigation.navigate('WorkoutPreview')}
					/>
				</View>
			</View>
		);
	}
}
