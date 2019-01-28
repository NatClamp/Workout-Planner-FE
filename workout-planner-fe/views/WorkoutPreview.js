import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import Model from '../components/Model';
import WorkoutPreviewList from '../components/WorkoutPreviewList';

export default class WorkoutPreview extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const currentWorkout = params.currentWorkout;
    const currentUser = params.currentUser;
    console.log(currentUser)
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 350, marginTop: 10 }}>
          <Model />
        </View>
        <WorkoutPreviewList currentWorkout={currentWorkout} currentUser={currentUser}/>
        <Button
          title="Start Workout"
          onPress={() => this.props.navigation.navigate('CompanionScreen')}
        />
      </View>
    );
  }
}
