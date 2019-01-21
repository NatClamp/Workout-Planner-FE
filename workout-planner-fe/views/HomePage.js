import React from 'react';
import {
 StyleSheet, Text, View, Button 
} from 'react-native';
import Header from '../components/Header.js';
import Model from '../components/Model';
import ExerciseList from '../components/ExerciseList';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Model />
        <ExerciseList />
        <Button
          title="go"
          onPress={() => this.props.navigation.navigate('WorkoutPreview')}
        />
      </View>
    );
  }
}
