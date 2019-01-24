import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Accordion } from 'native-base';

export default class MuscleList extends Component {
  state = {
    dataSource: [],
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ backgroundColor: 'lightgreen' }}>ExerciseList</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text>{item.muscle_name}</Text>}
          keyExtractor={({ muscle_name }) => muscle_name}
        />
      </View>
    );
  }
  componentDidMount() {
    return fetch('http://192.168.230.34:9000/api/muscles')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.muscles,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
}
