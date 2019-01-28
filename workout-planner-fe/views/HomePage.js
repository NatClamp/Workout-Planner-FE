import React from 'react';
import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import Model from '../components/Model';
import { Accordion, Container, Content, Card, CardItem, Text } from 'native-base';
import {getAllUsers} from '../utils/backendAPI'

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class HomeScreen extends React.Component {

  state = {
    currentUser: '',
	workout: [],
	muscleVals:   {abdominals: 0, biceps: 0, calves: 0, chest: 0, forearms: 0, glutes: 0, hamstrings: 0, lowerback: 0, midback: 0, quadriceps: 0, shoulders: 0, obliques: 0, triceps: 0, upperback: 0},
	appUserAccount: {},
  };



  componentDidUpdate(prevProps, prevState){
	if (prevState.workout !== this.state.workout){
		this.calculateMuscleVals()
	}
	if (prevState.appUserAccount !== this.setState.appUserAccount){
		this.setUserAccount()
	}
	
}
setUserAccount = () => {
	AsyncStorage.setItem('userAccount', JSON.stringify(this.state.appUserAccount));
	console.log('stored!')

}
calculateMuscleVals = () => {
	const {workout} = this.state;
	const muscleVals =   {abdominals: 0, biceps: 0, calves: 0, chest: 0, forearms: 0, glutes: 0, hamstrings: 0, lowerback: 0, midback: 0, quadriceps: 0, shoulders: 0, obliques: 0, triceps: 0, upperback: 0}
	workout.forEach((exercise)=>{
		muscleVals[exercise.major_muscle] += 3;
		exercise.minor_muscles.forEach((muscle)=>{
			muscleVals[muscle] +=  1
		})
	})
	this.setState({muscleVals})
}
  render() {
    // const currentUser = this.props.navigation.getParam('currentUser');
    console.log(' from the state on homepage ====>', this.state.currentUser);
    return (
			<View style={{ flex: 1 }}>
				<View style={{ height: 350, marginTop: 10 }}>
					<Model muscleVals={this.state.muscleVals}/>
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
  convertFBLogin = (allUsers) =>{
	const currentUser = allUsers.users.filter((user)=>{
		const fbUser = this.state.currentUser.slice(1, this.state.currentUser.length-1)
		return user.actual_name === fbUser;
	})
	if (currentUser.length > 1) {console.log('NON UNIQUE LOGIN CREDENTIALS')}
	else {this.setState({appUserAccount: currentUser[0]})}
  }

  componentDidMount() {
	this.getCurrentUser();
	}

  getCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
		this.setState({ currentUser }, ()=>{
			getAllUsers().then((data)=>{
				this.convertFBLogin(data)
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
        this.setState({ workout });
      });
  };

}