import React from 'react';
import {
  StyleSheet, Text, View, Button, ScrollView,
} from 'react-native';
import Model from '../components/Model';

export default class HomeScreen extends React.Component {
  render() {
    const { getParam } = this.props.navigation;
    const currentUser = getParam('currentUser');
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 350, marginTop: 10 }}>
          <Model />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <Button
            title="Add Exercise"
            onPress={() => {
              this.props.navigation.navigate('MuscleScreen');
            }}
          />
          <Button
            title="View All Exercises"
            onPress={() => this.props.navigation.navigate('ExerciseList')}
          />
          <Button
            style={{ flex: 1, marginTop: 10, backgroundColor: 'blue' }}
            title="Workout Preview"
            onPress={() => this.props.navigation.navigate('WorkoutPreview')}
          />
        </ScrollView>
      </View>
    );
  }
  // componentDidMount() {
  // 	return fetch('http://192.168.230.34:9000/api/muscles')
  // 		.then((response) => response.json())
  // 		.then((responseJson) => {
  // 			this.setState(
  // 				{
  // 					muscles: responseJson.muscles
  // 				},
  // 				function() {}
  // 			);
  // 		})
  // 		.catch((error) => {
  // 			console.error(error);
  // 		});
  // }
}
