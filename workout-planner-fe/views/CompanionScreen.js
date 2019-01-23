import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import Model from '../components/Model';
import { Container, Header, Content, Accordion } from 'native-base';
const dataArray = [
	{ title: 'Dead Lift', content: 'Do it' },
	{ title: 'Crunches', content: 'DO IT' },
	{ title: 'Squats', content: 'DO IT!!!!!!' }
];

export default class CompanionScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model />
				</View>
				<Container>
					<Content padder>
						<Accordion dataArray={dataArray} expanded={0} />
					</Content>
				</Container>
				<TouchableOpacity style={styles.completeWorkout} title='Complete Workout'>
					<Text>Complete Workout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	completeWorkout: {
		padding: 10,
		margin: 10,
		fontSize: 24,
		backgroundColor: 'powderblue'
	}
});
