import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class WorkoutPreviewList extends Component {
	state = {
		dataSource: []
	};
	render() {
		return (
			<Fragment>
				<Text style={{ flex: 2, backgroundColor: 'lightgreen' }}>ExerciseList</Text>
				<Text style={{ flex: 1, backgroundColor: 'lightgrey' }}>Buttons</Text>
			</Fragment>
		);
	}
}

export default WorkoutPreviewList;
