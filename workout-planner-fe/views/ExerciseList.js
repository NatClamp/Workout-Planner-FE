import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Accordion, Container, Item, Icon, Input, Button, Content, Card, CardItem } from 'native-base';
import { SearchBar } from 'react-native-elements';
import Panel from 'react-native-panel';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class ExerciseList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: []
		};

		this.exerciseholder = [];
	}

	render() {
		const { getParam } = this.props.navigation;
		const addExerciseToWorkout = getParam('addExerciseToWorkout');
		return (
			<View style={{ flex: 1 }}>
				<SearchBar
					placeholder='Type Here...'
					onChangeText={(text) => this.searchFilterFunction(text)}
					autoCorrect={false}
				/>
				<ScrollView>
					{this.state.exercises.map((item, index) => {
						return (
							<Panel key={index} header={item.title}>
								<Fragment>
									<Text style={styles.myDescription}>{item.content}</Text>
									<Text>{`Major Muscle: ${item.major_muscle}`}</Text>
									<Button
										onPress={() => {
											addExerciseToWorkout(item.title);
										}}
									>
										<Text>Add to Workout</Text>
									</Button>
								</Fragment>
							</Panel>
						);
					})}
				</ScrollView>
			</View>
		);
	}

	searchFilterFunction = (text) => {
		const newData = this.exerciseholder.filter((exercise) => {
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
				this.exerciseholder = responseJson.exercises;
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

const styles = StyleSheet.create({
	myDescription: {
		padding: 10,
		paddingTop: 0,
		height: 150
	}
});
