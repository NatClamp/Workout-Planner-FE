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

export default (Stack = createStackNavigator({
  Home: {
    screen: HomePage,
  },
  WorkoutPreview: {
    screen: WorkoutPreview,
  },
  CompanionScreen: {
    screen: CompanionScreen,
  },
}));
