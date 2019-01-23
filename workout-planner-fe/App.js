import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
// import RootNavigator from './navigation/Navigators';
import Loading from './views/Loading';
import HomePage from './views/HomePage';
import SignIn from './views/SignIn';

// const AppContainer = createAppContainer(RootNavigator);

// export default class App extends React.Component {
// 	render() {
// 		return (
// 			<AppContainer onUserLogout={() => this.setState({ isLoggedIn: false })} />
//     )
// 	}
// }

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      HomePage,
      SignIn,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);

export default AppContainer;
