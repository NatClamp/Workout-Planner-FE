import React, { Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  Alert,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import {
  getCompletedWorkouts,
  getSavedWorkouts,
  patchUser,
  getSingleUser,
  removeSavedWorkout,
} from '../utils/backendAPI';
import { Icon } from 'native-base';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved_workouts: [],
      completedWorkouts: [],
      calendarPoints: {},
      currentEvent: 'Touch day to see workout',
      isFemale: true,
      genderResolved: true,
      savedWorkoutsView: false,
      tappedWorkout: '',
      loggedInUser: {},
    };
  }
  componentWillMount() {
    this.assignUser();
  }
  assignUser = async () => {
    const user = await AsyncStorage.getItem('userAccount');
    const loggedInUser = JSON.parse(user);
    this.setState({ loggedInUser: loggedInUser, isFemale: loggedInUser.isFemale });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.completedWorkouts !== this.state.completedWorkouts) {
      const calendarPoints = this.state.completedWorkouts.reduce((acc, item) => {
        acc[item.dateString] = { selected: true };
        return acc;
      }, {});
      this.setState({ calendarPoints });
    }
    if (prevState.loggedInUser !== this.state.loggedInUser) {
      this.getUserCompletedWorkouts();
      this.getUserSavedWorkouts();
    }
  }
  render() {
    const {
      loggedInUser,
      saved_workouts,
      completedWorkouts,
      calendarPoints,
      currentEvent,
      savedWorkoutsView,
      tappedWorkout,
      isFemale,
    } = this.state;

    return (
      <ScrollView style={styles.outerContainer}>
        <Image style={styles.logo} source={require('../assets/logo2.png')} />
        <Text style={styles.curlFriend}>curlFriend</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 25, textAlign: 'center', margin: 5 }}>{`Hi, ${
            loggedInUser.user_name
          }!`}</Text>
          <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
            <Text style={{ alignSelf: 'center', color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        {completedWorkouts.length > 0 && (
          <Text style={{ textAlign: 'center', margin: 20 }}>
            Your last workout was {completedWorkouts[0].workout_name} on{' '}
            {completedWorkouts[0].dateString}
          </Text>
        )}
        {Object.keys(calendarPoints).length > 0 && (
          <>
            <Calendar
              horizontal={true}
              style={{ marginBottom: 10 }}
              pagingEnabled={true}
              markedDates={calendarPoints}
              onDayPress={e => {
                const selectedDate = e.dateString;
                const workoutOnThatDay = completedWorkouts.filter(item => {
                  return item.dateString === selectedDate;
                });
                if (workoutOnThatDay.length === 0) {
                  this.setState({ currentEvent: '' });
                } else if (workoutOnThatDay.length === 1) {
                  this.setState({
                    currentEvent: `${workoutOnThatDay[0].dateString}: ${
                      workoutOnThatDay[0].workout_name
                    }`,
                  });
                } else if (workoutOnThatDay.length > 1) {
                  const activities = workoutOnThatDay
                    .map(item => {
                      return item.workout_name;
                    })
                    .join(', ');
                  this.setState({
                    currentEvent: `${workoutOnThatDay[0].dateString}: ${activities}`,
                  });
                }
              }}
            />

            <Text style={{ textAlign: 'center' }}>{currentEvent}</Text>
          </>
        )}

        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.subtitle}>Model Gender</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={isFemale ? styles.buttonActive : styles.buttonInactive}
            onPress={() => {
              this.toggleGender(false);
            }}
          >
            <Text
              style={
                isFemale
                  ? { textAlign: 'center', color: 'black' }
                  : { textAlign: 'center', color: 'white' }
              }
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={!isFemale ? styles.buttonActive : styles.buttonInactive}
            onPress={() => {
              this.toggleGender(true);
            }}
          >
            <Text
              style={
                isFemale
                  ? { textAlign: 'center', color: 'white' }
                  : { color: 'black', textAlign: 'center' }
              }
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
        <Icon />

        <View
          style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', borderRadius: 10 }}
        >
          {saved_workouts.length > 0 && (
            <TouchableOpacity
              style={styles.loadWorkout}
              id="savedWorkoutsView"
              onPress={() => this.handleDropdown('savedWorkoutsView')}
            >
              <Text>Saved Workouts v</Text>
            </TouchableOpacity>
          )}
          {tappedWorkout.length > 0 && (
            <>
              <TouchableOpacity style={styles.loadWorkout} onPress={this.unSaveWorkout}>
                <Text>Remove Selected</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loadWorkout} onPress={this.loadWorkout}>
                <Text>Load Selected</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {savedWorkoutsView && (
          <FlatList
            style={{ minHeight: 200 }}
            data={saved_workouts.map((item, i) => {
              return { workout: item.workout, key: item.workout };
            })}
            renderItem={({ item }) => (
              <Text
                style={tappedWorkout === item.key ? styles.selectedWorkout : styles.workoutItem}
                onPress={() => {
                  this.tapWorkout(item.key);
                }}
                key={item.key}
              >
                {item.workout}
              </Text>
            )}
          />
        )}
      </ScrollView>
    );
  }
  unSaveWorkout = () => {
    const user = this.state.loggedInUser.user_name;
    const workout = this.state.tappedWorkout;
    removeSavedWorkout(user, workout)
      .then(() => {
        const newSaves = this.state.saved_workouts.filter(item => {
          return item.workout !== workout;
        });
        this.setState({ saved_workouts: newSaves, tappedWorkout: '' });
      })
      .catch(err => {
        Alert.alert('Error', `There was a problem deleting ${workout}, sorry about that.`, [
          { text: 'OK' },
        ]);
      });
  };

  handleDropdown = id => {
    this.setState({ [id]: !this.state[id], tappedWorkout: '' });
  };
  loadWorkout = () => {
    const selectedWorkout = this.state.saved_workouts.filter(item => {
      return item.workout === this.state.tappedWorkout;
    })[0];
    this.props.navigation.navigate('Home', { workoutToLoad: selectedWorkout.exercises });
  };

  tapWorkout = workout => {
    this.state.tappedWorkout === workout
      ? this.setState({ tappedWorkout: '' })
      : this.setState({ tappedWorkout: workout });
  };
  refreshUserData = () => {
    getSingleUser(this.state.loggedInUser.user_name)
      .then(data => {
        return data.json();
      })
      .then(({ user }) => {
        AsyncStorage.setItem('userAccount', JSON.stringify(user));
        this.assignUser();
        Alert.alert(
          'Model Changed',
          "Model successfully changed. Changes won't take effect until the app is restarted",
          [{ text: 'OK' }],
        );
      });
  };

  toggleGender = bool => {
    const { isFemale, loggedInUser } = this.state;
    const originalGender = isFemale;
    this.setState({ isFemale: bool }, () => {
      patchUser(loggedInUser.user_name, this.state.isFemale)
        .then(() => {
          this.refreshUserData();
        })
        .catch(err => {
          this.setState({ isFemale: originalGender });
        });
    });
  };
  getUserCompletedWorkouts = () => {
    getCompletedWorkouts(this.state.loggedInUser.user_name).then(({ userCompleted }) => {
      if (userCompleted) {
        userCompleted.sort((a, b) => {
          return b.created_at - a.created_at;
        });
        userCompleted.map(item => {
          item.dateString = item.created_at.slice(0, 10);
        });
        this.setState({ completedWorkouts: userCompleted });
      }
    });
  };
  getUserSavedWorkouts = () => {
    getSavedWorkouts(this.state.loggedInUser.user_name).then(res => {
      this.setState({ saved_workouts: res });
    });
  };

  handleLogout = () => {
    AsyncStorage.removeItem('userAccount');
    AsyncStorage.removeItem('currentUser');
    AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('SignIn');
  };
}

const styles = StyleSheet.create({
  buttonActive: {
    width: 100,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonInactive: {
    width: 100,
    padding: 10,
    backgroundColor: 'rgba(44,73,127, 0.5)',
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
  },
  loadWorkout: {
    width: 100,
    marginLeft: 20,
    padding: 10,
    marginRight: 20,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
  },
  selectedWorkout: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'green',
    borderRadius: 3,
  },
  workoutItem: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 5,
    display: 'flex',
    alignSelf: 'center',
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(44,73,127, 0.5)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 80,
    fontFamily: 'Roboto-Regular',
  },
  curlFriend: {
    fontSize: 50,
    marginBottom: 20,
    fontFamily: 'Krub-Bold',
    color: '#2C497F',
    alignSelf: 'center',
  },
  name: {
    fontSize: 25,
    textAlign: 'center',
    margin: 5,
  },
  outerContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
});
