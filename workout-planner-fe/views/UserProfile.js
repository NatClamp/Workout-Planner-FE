import React, {Fragment} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {Calendar} from 'react-native-calendars'
import moment from 'moment'
import { Switch } from 'native-base';



export default class UserProfile extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user_name: 'charlie',
			saved_workouts: ['leg day', 'arm day', 'chest day'],
			completedWorkouts: [],
			calendarPoints: {},
			currentEvent: 'Touch day to see workout',
			isFemale: true,
			genderSwitchResolved: true,
			savedWorkoutsView: false,
			tappedWorkout: ''
		}
	}
	componentDidMount(){
		this.getUserCompletedWorkouts()
	}
	componentDidUpdate(prevProps, prevState){
		if (prevState.completedWorkouts !== this.state.completedWorkouts) {
			const calendarPoints = this.state.completedWorkouts.reduce((acc, item)=>{acc[item.dateString] = {selected: true}
			return acc}, {})
		this.setState({calendarPoints})
		}
	}
	render() {
		const {user_name, saved_workouts, completedWorkouts, calendarPoints, currentEvent, savedWorkoutsView, tappedWorkout} = this.state
		
	
		return (
			<ScrollView style={{ flex: 1 }}>
				<Text style={{fontSize: 25, textAlign: 'center', margin: 5}}>{`${user_name}'s Page`}</Text>
				{(completedWorkouts.length > 0) &&<Text style={{textAlign: 'center', margin: 20}}>Your last workout was {completedWorkouts[0].workout} on {completedWorkouts[0].dateString}</Text>}
				{Object.keys(calendarPoints).length > 0 &&
				<Calendar
				horizontal={true}
				style={{marginBottom: 10}}
				pagingEnabled={true}
				markedDates={calendarPoints}
				onDayPress={(e)=>{
					const selectedDate = e.dateString
					const workoutOnThatDay = completedWorkouts.filter((item)=>{return item.dateString === selectedDate})
					if (workoutOnThatDay.length === 0) {
						this.setState({currentEvent: ''})
					}
					else if (workoutOnThatDay.length === 1){
						this.setState({currentEvent: `${workoutOnThatDay[0].dateString}: ${workoutOnThatDay[0].workout}`})
					}
					else if (workoutOnThatDay.length > 1){
						const activities = workoutOnThatDay.map((item)=>{return item.workout}).join(', ')
						this.setState({currentEvent: `${workoutOnThatDay[0].dateString}: ${activities}`})
					}
					}}
		
				/>}
				<Text style={{textAlign: 'center'}}>{currentEvent}</Text>

					<View style={{display: 'flex', flexDirection: 'row'}}>
					<TouchableOpacity style={{width: 150, marginLeft: 20, padding: 10, marginRight: 20, marginTop: 20, borderColor: 'black', borderWidth: 1, borderStyle: 'solid', borderRadius: 3,}} id='savedWorkoutsView' onPress={()=>this.handleDropdown('savedWorkoutsView')}><Text>Saved Workouts v</Text></TouchableOpacity>
					{tappedWorkout.length > 0 && <TouchableOpacity style={{width: 150, marginLeft: 20, padding: 10, marginRight: 20, marginTop: 20, borderColor: 'black', borderWidth: 1, borderStyle: 'solid', borderRadius: 3,}}><Text>Load Selected</Text></TouchableOpacity>}</View>
				{savedWorkoutsView && <FlatList style={{minHeight: 200}} data={saved_workouts.map((item, i)=>{return {workout: item, key: item+i}})} renderItem={({item})=><Text style={tappedWorkout === item.key ?{marginLeft: 20, marginRight: 20, marginTop: 0, padding: 10, borderColor: 'grey', borderWidth: 1, borderStyle: 'solid',backgroundColor: 'green', borderRadius: 3,}:{marginLeft: 20, marginRight: 20, marginTop: 0, padding: 10, borderColor: 'grey', borderWidth: 1, borderStyle: 'solid', borderRadius: 3,}} onPress={()=>{this.tapWorkout(item.key)}} key={item.key}>{item.workout}</Text>}/>}
				<Text style={{fontSize: 16, marginTop: 25, marginBottom: 10, marginLeft: 5, fontWeight: 'bold'}}>Preferences</Text>
				<Text>Model Gender</Text>
				<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<Text>Male</Text>
					<Switch accessibilityLabel='Change model gender' style={{margin: 5}} onValueChange={this.toggleGender} thumbColor={'#FFFFFF'} value={this.state.isFemale} disabled={!this.state.genderSwitchResolved} trackColor={{false: '#BBBBBB', true: '#BBBBBB'}}/>
					<Text>Female</Text></View>
					<Text>Change Username</Text>
					<TextInput accessibilityLabel='Change Username' id='' style={{backgroundColor: '#DDDDDD', borderRadius: 5, width: 200, padding: 5}}/>
				
				</ScrollView>
				
		);
	}

	handleDropdown = (id) => {
		this.setState({[id]: !this.state[id], tappedWorkout: ''}, console.log(this.state))
	}
	loadWorkout = () => {
		// save workout data into props and navigate to companion page

	}
	tapWorkout = (workout) => {
		this.state.tappedWorkout === workout ? this.setState({tappedWorkout: ''}):
		this.setState({tappedWorkout: workout})
	}

	toggleGender = ()=> { 
		this.setState({isFemale: !this.state.isFemale, /*genderSwitchResolved: false*/}, ()=>{
			console.log('Placeholder patch request, setting gender to:', this.state.isFemale ? 'female': 'male')
			// .then(()=>{this.setState({genderSwitchResolved: true})}) UNCOMMENT ALL ONCE GET REQUEST IS HERE
			// .catch(()=>{this.setState({genderSwitchResolved: true, isFemale: !this.state.isFemale})})
		}
		)
}
	getUserCompletedWorkouts = () => {
		// get request for completed workouts
		const fakeData = [
			{
			  "created_at": 1548328270,
		  
			  "workout": "workout 1",
		  
			  "user": "charlie"
			},
			{
				"created_at": 1547769600,
			
				"workout": "my favourite",
			
				"user": "charlie"
			  },
			  {
				"created_at": 1548201600,
			
				"workout": "back workout",
			
				"user": "charlie"
			  }, {
			  "created_at": 1548201600,
			
			  "workout": "arm workout",
		  
			  "user": "charlie"
			},{
			"created_at": 1548201600,
			
			"workout": "head workout",
		
			"user": "charlie"
		  }
		  ]
		  fakeData.sort((a,b)=>{return (b.created_at - a.created_at)})
		  fakeData.map((item)=>{item.dateString = moment.unix(item.created_at).format("YYYY-MM-DD")})
		  this.setState({completedWorkouts: fakeData})
	}
}
