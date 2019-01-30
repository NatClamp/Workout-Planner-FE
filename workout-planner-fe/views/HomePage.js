import React from 'react';
import { StyleSheet, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import Model from '../components/Model';
import { Accordion, Container, Content, Card, CardItem, Text } from 'native-base';
import { getAllUsers, getExerciseDetails } from '../utils/backendAPI';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class HomeScreen extends React.Component {
  state = {
    currentUser: '',
    workout: [],
    muscleVals: {
      abdominals: 0,
      biceps: 0,
      calves: 0,
      chest: 0,
      forearms: 0,
      glutes: 0,
      hamstrings: 0,
      lowerback: 0,
      midback: 0,
      quadriceps: 0,
      shoulders: 0,
      obliques: 0,
      triceps: 0,
      upperback: 0,
    },
    appUserAccount: {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.navigation.state !== this.props.navigation.state) {
      const { params } = this.props.navigation.state;
      const workoutToLoad = params.workoutToLoad;
      if (workoutToLoad) {
        this.fetchWorkoutExercises(workoutToLoad);
        this.setState({ workout: workoutToLoad });
      }
    }
    if (prevState.workout !== this.state.workout) {
    }
    if (prevState.appUserAccount !== this.setState.appUserAccount) {
    }
  }
  fetchWorkoutExercises = workoutToLoad => {
    const workoutExercises = [];
    workoutToLoad.forEach(exerciseName => {
      workoutExercises.push(getExerciseDetails(exerciseName));
    });
    Promise.all(workoutExercises)
      .then(data => {
        return Promise.all(
          data.map(i => {
            return i.json();
          }),
        );
      })
      .then(data => {
        this.setState({
          workout: data.map(exercise => {
            return exercise.exercise;
          }),
        });
      })
      .then(() => {
        this.calculateMuscleVals();
      });
  };

  setUserAccount = data => {
    AsyncStorage.setItem('userAccount', JSON.stringify(data));
  };
  calculateMuscleVals = () => {
    const { workout } = this.state;
    const muscleVals = {
      abdominals: 0,
      biceps: 0,
      calves: 0,
      chest: 0,
      forearms: 0,
      glutes: 0,
      hamstrings: 0,
      lowerback: 0,
      midback: 0,
      quadriceps: 0,
      shoulders: 0,
      obliques: 0,
      triceps: 0,
      upperback: 0,
    };
    workout.forEach(exercise => {
      muscleVals[exercise.major_muscle] += 3;
      exercise.minor_muscles.forEach(muscle => {
        muscleVals[muscle] += 1;
      });
    });
    this.setState({ muscleVals });
  };
  render() {
    console.log(' from the state on homepage ====>', this.state.currentUser);
    const { workout, appUserAccount } = this.state;
    if (Object.keys(appUserAccount).length > 0) {
      this.gender = appUserAccount.isFemale;
    }
    return (
      <View style={styles.outerContainer}>
        <View style={styles.model}>
          {this.gender !== undefined && appUserAccount && (
            <Model muscleVals={this.state.muscleVals} gender={this.gender} />
          )}
        </View>
        <View style={styles.allButtonContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ExerciseList')}
            >
              <Text style={styles.linkText}>All Exercises</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('CreateExerciseForm');
              }}
            >
              <Text style={styles.linkText}>Create Exercise</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.exerciseButton}
              onPress={() => {
                this.props.navigation.navigate('MuscleScreen', {
                  addExerciseToWorkout: this.addExerciseToWorkout,
                });
              }}
            >
              <Text style={styles.linkText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.exerciseList}>
          <Content>
            {this.state.workout.length === 0 ? (
              <Text style={styles.emptyWorkout}>Please add an exercise to your workout</Text>
            ) : (
              this.state.workout.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardItem header>
                      <Text style={styles.cardText}>{item.title}</Text>
                    </CardItem>
                  </Card>
                );
              })
            )}
          </Content>
        </View>

        <View style={styles.previewWorkoutButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('WorkoutPreview', {
                currentWorkout: this.state.workout,
                currentUser: this.state.currentUser,
                appUserAccount: this.state.appUserAccount,
              })
            }
            style={styles.previewWorkoutButton}
          >
            <Text style={styles.linkText}>Workout Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  convertFBLogin = async allUsers => {
    const currentUser = allUsers.users.filter(user => {
      const fbUser = this.state.currentUser.slice(1, this.state.currentUser.length - 1);
      return user.actual_name === fbUser;
    });
    if (currentUser.length > 1) {
      console.log('NON UNIQUE LOGIN CREDENTIALS');
    } else {
      await this.setUserAccount(currentUser[0]);
      const storedUser = await AsyncStorage.getItem('userAccount');
      this.setState({ appUserAccount: JSON.parse(storedUser) });
    }
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        this.setState({ currentUser }, () => {
          getAllUsers().then(data => {
            this.convertFBLogin(data);
          });
        });
      } else {
        console.log('error in the getCurrentUser function');
      }
    } catch (error) {
      console.log(error);
    }
  };

  addExerciseToWorkout = exerciseName => {
    const formattedExercise =
      exerciseName.split(' ').length > 1 ? exerciseName.split(' ').join('%20') : exerciseName;
    return fetch(`${URL}/exercises/${formattedExercise}`)
      .then(response => response.json())
      .then(respJSON => {
        const workout = [...this.state.workout];
        workout.push(respJSON.exercise);
        this.setState({ workout }, () => {
          this.calculateMuscleVals();
        });
      });
  };
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  allButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 5,
    backgroundColor: 'rgba(44,73,127, 0.5)',
    borderRadius: 4,
  },
  exerciseButton: {
    padding: 6,
    backgroundColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
  },
  previewWorkoutButtonContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  previewWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 250,
    backgroundColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
  },
  model: {
    height: 350,
    margin: 10,
  },
  linkText: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  exerciseList: {
    margin: 10,
    padding: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
  },
  cardText: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: '#2C497F',
  },
  emptyWorkout: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Roboto-Light',
    color: '#2C497F',
  },
});
