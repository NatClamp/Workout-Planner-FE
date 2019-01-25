import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Accordion } from 'native-base';

const URL = 'https://nc-project-be.herokuapp.com/api/';

class ExerciseList extends Component {
  state = {
    exercises: [],
  };
  render() {
    return (
      <Fragment>
        <View style={{ flex: 1 }}>
          <Accordion data={this.state.exercises} />
        </View>
      </Fragment>
    );
  }
  componentDidMount() {
    return fetch(`${URL}/exercises`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            exercises: responseJson.exercises,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default ExerciseList;
