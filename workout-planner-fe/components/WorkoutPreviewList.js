import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class WorkoutPreviewList extends Component {
  state = {
    dataSource: [],
  };
  render() {
    return (
      <Fragment>
        <Text style={{ flex: 2, backgroundColor: 'lightgreen' }}>
          ExerciseList
        </Text>
        <Text style={{ flex: 1, backgroundColor: 'lightgrey' }}>Buttons</Text>
      </Fragment>
    );
  }
  //   componentDidMount() {
  //     return fetch('https://jhnc-news.herokuapp.com/api/articles')
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         this.setState(
  //           {
  //             dataSource: responseJson.articles,
  //           },
  //           function() {},
  //         );
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
}

export default WorkoutPreviewList;
