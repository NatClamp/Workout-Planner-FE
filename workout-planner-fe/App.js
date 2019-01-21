import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Model from './components/Model';
import ExerciseList from './components/ExerciseList';

export default class App extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header />
				<Model />
				<ExerciseList />
			</View>
		);
	}
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
