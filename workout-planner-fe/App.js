import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
// import RootNavigator from './navigation/Navigators';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';
import Loading from './views/Loading';
import HomePage from './views/HomePage';
import SignIn from './views/SignIn';

const WorkoutStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: 'Home',
      },
    },
    WorkoutPreview: {
      screen: WorkoutPreview,
      navigationOptions: {
        title: 'Workout Preview',
      },
    },
    CompanionScreen: {
      screen: CompanionScreen,
      navigationOptions: {
        title: 'Workout Companion',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

// const AppTabs = createBottomTabNavigator({
//   Home: {
//     screen: HomePage,
//     title: 'Home',
//   },
//   Profile: {
//     screen: 'UserProfile',
//   },
// });

const AuthStack = createStackNavigator({
  HomePage: {
    screen: WorkoutStack,
  },
  SignIn: {
    screen: 'SignIn',
    navigationOptions: {
      title: 'Sign In',
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthentificationCheck: Loading,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthentificationCheck',
    },
  ),
);

export default AppContainer;
