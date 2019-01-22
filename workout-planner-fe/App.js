import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RootNavigator from './navigation/Navigators';

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
