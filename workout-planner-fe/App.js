import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RootNavigator from './navigation/Navigators';
import Login from './views/Login';

const AppContainer = createAppContainer(RootNavigator);

export default class App extends React.Component {
	state = {
		isLoggedIn: false
	};
	render() {
		return this.state.isLoggedIn ? (
			<AppContainer onUserLogout={() => this.setState({ isLoggedIn: false })} />
		) : (
			<Login onUserLogin={() => this.setState({ isLoggedIn: true })} />
		);
	}
}
