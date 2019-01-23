import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import Model from '../components/Model';
import ExerciseList from '../components/ExerciseList';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
    <Model style={{ flex: 2 }} />
    <ExerciseList />
    <Button title="go" onPress={() => this.props.navigation.navigate('WorkoutPreview')} />
  </View>
    );
  }
}
