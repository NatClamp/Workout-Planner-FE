import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Model from '../components/Model';
import WorkoutPreviewList from '../components/WorkoutPreviewList';

export default class WorkoutPreview extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model />
				</View>
				<WorkoutPreviewList />
				<Button title='Start Workout' onPress={() => this.props.navigation.navigate('CompanionScreen')} />
			</View>
		);
	}
}
