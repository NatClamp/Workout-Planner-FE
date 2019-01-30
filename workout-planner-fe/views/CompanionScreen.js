import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Model from '../components/Model';
import { Container, Content } from 'native-base';
import { ListItem, CheckBox } from 'react-native-elements';
import axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CompanionScreen extends React.Component {
	state = {
		isPrivate: true,
		exercises: [],
		checked: [],
		appUserAccount: {},
		muscleVals: {
			abdominals: 0,
			biceps: 0,
			calves: 0,
			chest: 0,
			forearms: 0,
			glutes: 0,
			hamstrings: 0,
			lowerback: 0,
			midback: 0,
			quadriceps: 0,
			shoulders: 0,
			obliques: 0,
			triceps: 0,
			upperback: 0
		}
	};

	checkItem = (exercise) => {
		const { checked } = this.state;
		if (!checked.includes(exercise)) {
			this.setState({ checked: [ ...checked, exercise ] });
		} else {
			this.setState({ checked: checked.filter((a) => a !== exercise) });
		}
	};

	calculateMuscleVals = () => {
		const { checked } = this.state;
		const muscleVals = {
			abdominals: 0,
			biceps: 0,
			calves: 0,
			chest: 0,
			forearms: 0,
			glutes: 0,
			hamstrings: 0,
			lowerback: 0,
			midback: 0,
			quadriceps: 0,
			shoulders: 0,
			obliques: 0,
			triceps: 0,
			upperback: 0
		};
		checked.forEach((exercise) => {
			muscleVals[exercise.major_muscle] += 3;
			exercise.minor_muscles.forEach((muscle) => {
				muscleVals[muscle] += 1;
			});
		});
		this.setState({ muscleVals });
	};

	componentDidUpdate(prevState) {
		if (prevState.checked !== this.state.checked) {
			this.calculateMuscleVals();
		}
	}

	render() {
		return (
			<View style={styles.outerContainer}>
				<View style={styles.model}>
					<Model muscleVals={this.state.muscleVals} />
				</View>
				<Container>
					<Content padder>
						<View>
							{this.state.exercises.map((exercise, i) => (
								<ListItem
									key={i}
									title={exercise.title}
									hideChevron
									subtitle={`Major: ${exercise.major_muscle}`}
									leftIcon={
										<CheckBox
											onPress={() => this.checkItem(exercise)}
											checked={this.state.checked.includes(exercise)}
										/>
									}
								/>
							))}
						</View>
					</Content>
				</Container>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={this.completeWorkout()}>
						<Text style={styles.linkText}>Complete Workout</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	completeWorkout = () => {
		this.saveWorkout();
		const username = this.state.appUserAccount.user_name;
		const nameWorkout = `${username}s_workout${this.state.appUserAccount._id}`;
		axios
			.post(`${URL}/workouts/${nameWorkout}`, {
				completed_by: username
			})
			.then(() => {
				this.props.navigation.navigate('CompletionModal');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	saveWorkout = () => {
		this.postWorkout();
		const username = this.state.appUserAccount.user_name;
		const nameWorkout = `${username}s_workout${this.state.appUserAccount._id}`;
		axios.post(`${URL}/workouts/${nameWorkout}/save/${username}`).catch((err) => {
			console.log(err);
		});
	};

	postWorkout = () => {
		const nameWorkout = `${this.state.appUserAccount.user_name}s_workout${this.state.appUserAccount._id}`;
		const id = this.state.appUserAccount._id;
		const isPrivate = this.state.isPrivate;
		const exercises = this.state.exercises.map((exercise) => exercise.title);
		axios
			.post(`${URL}/workouts`, {
				name: nameWorkout,
				exercises: exercises,
				private: isPrivate,
				created_by: id
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
const styles = StyleSheet.create({
	outerContainer: {
		flex: 1
	},
	model: {
		height: 350,
		margin: 10
	},
	buttonContainer: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		width: 250,
		backgroundColor: 'rgba(44,73,127, 1)',
		borderRadius: 4
	},
	linkText: {
		fontFamily: 'Roboto-Light',
		fontSize: 16,
		color: '#fff',
		textAlign: 'center'
	}
});
