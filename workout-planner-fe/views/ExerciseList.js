import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Panel from 'react-native-panel';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],
    };

    this.exerciseholder = [];
  }

  render() {
    const { getParam } = this.props.navigation;
    const addExerciseToWorkout = getParam('addExerciseToWorkout');
    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
        />
        <ScrollView>
          {this.state.exercises.map((item, index) => {
            return (
              <Panel key={index} header={item.title}>
                <Fragment>
                  <Text style={styles.content}>{item.content}</Text>
                  <Text style={styles.major_muscle}>{`Major Muscle: ${item.major_muscle
                    .charAt(0)
                    .toUpperCase() + item.major_muscle.slice(1)}`}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      addExerciseToWorkout(item.title);

                      Alert.alert(
                        'Added',
                        `You have added ${item.title} to your workout`,
                        [{ text: 'Ok' }],
                        { cancelable: false },
                      );
                    }}
                  >
                    <Text style={styles.linkText}>Add to Workout</Text>
                  </TouchableOpacity>
                </Fragment>
              </Panel>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  searchFilterFunction = text => {
    const newData = this.exerciseholder.filter(exercise => {
      const exerciseData = `${exercise.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return exerciseData.indexOf(textData) > -1;
    });
    this.setState({ exercises: newData });
  };

  componentDidMount() {
    return fetch(`${URL}/exercises`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          exercises: responseJson.exercises,
        });
        this.exerciseholder = responseJson.exercises;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    paddingTop: 0,
    height: 150,
  },
  major_muscle: {
    padding: 10,
    paddingTop: 0,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 250,
    backgroundColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
  },
  linkText: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});



