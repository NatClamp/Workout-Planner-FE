import React, { Component, Fragment } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Button, Modal, TouchableHighlight, Alert } from 'react-native';
import { Accordion, Icon, Header } from 'native-base';
import ExerciseModal from './ExerciseModal';
import Swipeout from 'react-native-swipeout';

const swipeoutBtns = [
	{
		text: 'Button'
	}
];

class MuscleList extends Component {
	state = {
		modalVisible: false,
		modalVisible2: false,
		muscleExercises: []
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	render() {
		return (
			<Fragment>
				<View>
					<Modal
						animationType='fade'
						transparent={false}
						visible={this.state.modalVisible}
						presentationStyle='overFullScreen'
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}
					>
						<ScrollView style={{ marginTop: 22 }}>
							<Header>
								<Icon
									name='md-arrow-back'
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
								/>
								<Text>Select Exercise</Text>
							</Header>

							<View>
								<Swipeout right={swipeoutBtns}>
									<Fragment>
										{this.props.muscles.map((item, key) => (
											<Text
												key={key}
												style={styles.TextStyle}
												onPress={() => {
													this.setModalVisible(true);
													this.getExerciseByMuscle(item.muscle_name);
												}}
											>
												{item.muscle_name}
											</Text>
										))}
									</Fragment>
								</Swipeout>
							</View>
						</ScrollView>
					</Modal>

					<TouchableHighlight>
						<ScrollView>
							<Text
								onPress={() => {
									this.setModalVisible(true);
								}}
							>
								Add Exercise
							</Text>
						</ScrollView>
					</TouchableHighlight>
				</View>
			</Fragment>
		);
	}
	getExerciseByMuscle = (muscle_name) => {
		return fetch(`http://192.168.230.34:9000/api/exercises/muscle/${muscle_name}`)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						muscleExercises: responseJson.exercises
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	handleClick = () => {
		getExerciseByMuscle();
	};
}

export default MuscleList;

const styles = StyleSheet.create({
	TextStyle: {
		fontSize: 15,
		textAlign: 'left',
		backgroundColor: 'green',
		padding: 10,
		borderColor: 'black',
		borderWidth: 4
	}
});
