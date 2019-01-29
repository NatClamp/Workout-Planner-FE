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
    const appUserAccount = params.appUserAccount;
    const currentUser = params.currentUser;
    return (
      <View style={{ flex: 1 }}>
        <WorkoutPreviewList
          currentWorkout={currentWorkout}
          currentUser={currentUser}
          appUserAccount={appUserAccount}
          navigation={this.props.navigation}
        />
        <Button
          title="Start Workout"
          onPress={() => this.props.navigation.navigate('CompanionScreen', { currentWorkout })}
        />
      </View>
    );
  }
}
