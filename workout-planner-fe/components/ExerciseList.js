import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExerciseModal from './ExerciseModal';
import MuscleList from './MuscleList';

class ExerciseList extends Component {
	state = {
		dataSource: []
	};
	render() {
		return (
			<Fragment>
				<View style={{ flex: 1 }}>
					<MuscleList style={{ flex: 1, backgroundColor: 'pink' }} />
					<ExerciseModal dataSource={this.state.dataSource} />
				</View>
			</Fragment>
		);
	}
	componentDidMount() {
		return fetch('http://192.168.230.34:9000/api/exercises')
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState(
					{
						dataSource: responseJson.exercises
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

export default ExerciseList;
