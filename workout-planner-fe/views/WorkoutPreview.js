import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';
import WorkoutPreviewList from '../components/WorkoutPreviewList';

export default class WorkoutPreview extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const currentWorkout = params.currentWorkout;
    const appUserAccount = params.appUserAccount;
    const currentUser = params.currentUser;
    return (
      <View style={styles.outerContainer}>
        <WorkoutPreviewList
          currentWorkout={currentWorkout}
          currentUser={currentUser}
          appUserAccount={appUserAccount}
          navigation={this.props.navigation}
        />
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => this.props.navigation.navigate('CompanionScreen', { currentWorkout })}
        >
          <Text style={styles.linkText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    margin: 10,
    flex: 1,
  },
  linkContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(44,73,127, 1)',

    borderRadius: 4,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    textAlign: 'center',
  },
});