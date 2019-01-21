import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExerciseModal from './ExerciseModal';

class ExerciseList extends Component {
	state = {
		dataSource: []
	};
	render() {
		return (
			<Fragment>
				<Text style={{ flex: 2, backgroundColor: 'lightgreen' }}>ExerciseList</Text>
				<ExerciseModal dataSource={this.state.dataSource} />
				<Text style={{ flex: 1, backgroundColor: 'lightgrey' }}>Buttons</Text>
			</Fragment>
		);
	}
	componentDidMount() {
		return fetch('https://jhnc-news.herokuapp.com/api/articles')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						dataSource: responseJson.articles
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
