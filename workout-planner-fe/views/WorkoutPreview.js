import React from 'react';
import {
 StyleSheet, Text, View, Button 
} from 'react-native';
import Header from '../components/Header';
import Model from '../components/Model';
import WorkoutPreviewList from '../components/WorkoutPreviewList';

export default class WorkoutPreview extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Model />
        <WorkoutPreviewList />
      </View>
    );
  }
}
