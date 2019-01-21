import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import HomePage from '../views/HomePage';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';

export default (Stack = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home',
    },
  },
  WorkoutPreview: {
    screen: WorkoutPreview,
    navigationOptions: {
      title: 'Preview Workout',
    },
  },
  CompanionScreen: {
    screen: CompanionScreen,
    navigationOptions: {
      title: 'Your Workout',
    },
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      title: 'Profile',
    },
  },
}));
