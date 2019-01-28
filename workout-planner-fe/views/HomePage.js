import React from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import Model from '../components/Model';
import { Accordion, Container, Content, Card, CardItem, Text } from 'native-base';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class HomeScreen extends React.Component {

  state = {
    currentUser: '',
    workout: [],
  };
  render() {
    // const currentUser = this.props.navigation.getParam('currentUser');
    console.log(' from the state on homepage ====>', this.state.currentUser);
    return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model />
				</View>
				<View>
					<Button title='View All Exercises' onPress={() => this.props.navigation.navigate('ExerciseList')} />
				</View>
				<View>
					<Button
						title='Create an Exercise'
						onPress={() => this.props.navigation.navigate('CreateExerciseForm')}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<Container>
						<Content>
							{this.state.workout.length === 0 ? (
								<Card>
									<CardItem>
										<Text>Please add an exercise to your workout</Text>
									</CardItem>
								</Card>
							) : (
								this.state.workout.map((item, index) => {
									return (
										<Card key={index}>
											<CardItem header>
												<Text>{item.title}</Text>
											</CardItem>
										</Card>
									);
								})
							)}
						</Content>
					</Container>
					<Button
						title='Add Exercise'
						onPress={() => {
							this.props.navigation.navigate('MuscleScreen', {
								addExerciseToWorkout: this.addExerciseToWorkout
							});
						}}
					/>
				</View>

        <View>
          <Button
            style={{ flex: 1, marginTop: 10, backgroundColor: 'blue' }}
            title="Workout Preview"
            onPress={() =>
              this.props.navigation.navigate('WorkoutPreview', {
                currentWorkout: this.state.workout,
                currentUser: this.state.currentUser,
              })
            }
          />
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.getCurrentUser();
	}
	
  getCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        this.setState({ currentUser });
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
        this.setState({ workout });
      });
  };

}