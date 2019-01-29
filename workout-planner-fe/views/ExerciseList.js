import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Accordion, Container, Item, Icon, Input, Button } from 'native-base';
import { SearchBar } from 'react-native-elements';

const URL = 'https://nc-project-be.herokuapp.com/api/';

class ExerciseList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: []
		};

		this.arrayholder = [];
	}

	render() {
		return (
			<Fragment>
				<View style={{ flex: 1 }}>
					<SearchBar
						placeholder='Type Here...'
						onChangeText={(text) => this.searchFilterFunction(text)}
						autoCorrect={false}
					/>
					<Accordion data={this.state.exercises} />
				</View>
			</Fragment>
		);
	}

	searchFilterFunction = (text) => {
		const newData = this.arrayholder.filter((exercise) => {
			const exerciseData = `${exercise.title.toUpperCase()}`;
			const textData = text.toUpperCase();
			return exerciseData.indexOf(textData) > -1;
		});
		this.setState({ exercises: newData });
	};

	componentDidMount() {
		return fetch(`${URL}/exercises`)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					exercises: responseJson.exercises
				});
				this.arrayholder = responseJson.exercises;
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

export default ExerciseList;
