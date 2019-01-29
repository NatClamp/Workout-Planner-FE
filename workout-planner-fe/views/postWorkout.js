import React, { Fragment } from 'react';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class postWorkout extends React.Component {
  state = {
    workoutName: '',
    currentWorkout: [],
    appUserAccount: {},
    isPrivate: true,
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    const radio_props = [{ label: 'Private', value: true }, { label: 'Public', value: false }];

    return (
      <Fragment>
        <View style={styles.container}>
          <TextInput
            placeholder="Workout name"
            onChangeText={val => this.onChangeText('workoutName', val)}
            style={styles.input}
          />

          <Container style={styles.exerciseList}>
            <Content>
              {this.state.currentWorkout.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardItem header>
                      <Text>{item.title}</Text>
                    </CardItem>
                  </Card>
                );
              })}
            </Content>
          </Container>

          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={value => {
              this.setState({ isPrivate: value });
            }}
          />

          <Button title="Post Workout" onPress={this.postWorkout} />
        </View>
      </Fragment>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.navigation.state.params.currentWorkout;
    const appUserAccount = this.props.navigation.state.params.appUserAccount;
    this.setState({ currentWorkout, appUserAccount });
  }

  postWorkout = () => {
    const workoutName = this.state.workoutName;
    const username = this.state.appUserAccount._id;
    const isPrivate = this.state.isPrivate;
    const exercises = this.state.currentWorkout.map(exercise => exercise._id);
    console.log(workoutName, username, isPrivate, exercises);
    axios
      .post(`${URL}/workouts`, {
        name: workoutName,
        exercises: exercises,
        private: isPrivate,
        created_by: username,
      })
      .then(() => {
        Alert.alert('Successful', 'Thanks for making a workout!', [
          {
            text: 'Home',
            onPress: () => this.props.navigation.navigate('Home'),
          },
          {
            text: 'Workout',
            onPress: () =>
              this.props.navigation.navigate('CompanionScreen', {
                currentWorkout: this.state.currentWorkout,
              }),
          },
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseList: {},
});
