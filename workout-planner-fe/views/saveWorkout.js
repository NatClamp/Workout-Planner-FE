import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class saveWorkout extends React.Component {
  state = {
    workoutName: '',
    currentWorkout: [],
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Workout name"
          onChangeText={workoutName => this.setState({ workoutName })}
        />
      </View>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.currentWorkout;
    this.setState({ currentWorkout });
  }
}
