import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Stack from './navigation/Navigators';

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
