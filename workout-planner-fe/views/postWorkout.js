import React, { Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Alert } from 'react-native';
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

          <Container style={styles.container}>
            <Content>
              {this.state.currentWorkout.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardItem header>
                      <Text style={styles.generalText}>{item.title}</Text>
                    </CardItem>
                  </Card>
                );
              })}
            </Content>
          </Container>

          <View style={styles.radioContainer}>
            <RadioForm
              radio_props={radio_props}
              style={styles.radio}
              initial={0}
              buttonColor={'#2C497F'}
              selectedButtonColor={'#2C497F'}
              onPress={value => {
                this.setState({ isPrivate: value });
              }}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={this.saveWorkout}>
            <Text style={styles.buttonText}>Save Workout</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.navigation.state.params.currentWorkout;
    const appUserAccount = this.props.navigation.state.params.appUserAccount;
    this.setState({ currentWorkout, appUserAccount });
  }

  saveWorkout = () => {
    this.postWorkout();
    const workoutName = this.state.workoutName;
    const username = this.state.appUserAccount.user_name;
    axios
      .post(`${URL}/workouts/${workoutName}/save/${username}`)
      .then(() => {
        Alert.alert('Success', 'Thanks for making a workout!', [
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

  postWorkout = () => {
    const workoutName = this.state.workoutName;
    const user_id = this.state.appUserAccount._id;
    const isPrivate = this.state.isPrivate;
    const exercises = this.state.currentWorkout.map(exercise => exercise.title);
    axios
      .post(`${URL}/workouts`, {
        name: workoutName,
        exercises: exercises,
        private: isPrivate,
        created_by: user_id,
      })
      .catch(err => {
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    margin: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  exerciseList: {
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
    width: 250,
  },
  radioContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  radio: {
    padding: 20,
    fontFamily: 'Roboto-Regular',
  },
  generalText: {
    fontFamily: 'Krub-Medium',
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  button: {
    backgroundColor: 'rgba(44,73,127, 1)',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#42A5F5',
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'white',
  },
});
