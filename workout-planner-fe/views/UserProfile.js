import React, {Fragment} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {CalendarList} from 'react-native-calendars'
import moment from 'moment'

export default class UserProfile extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			user_name: 'charlie',
			saved_workouts: ['leg%day', 'arm%day', 'chest%day'],
			completedWorkouts: [],
			calendarPoints: {},
			currentEvent: 'Touch day to see workout'
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
		const {user_name, saved_workouts, completedWorkouts, calendarPoints, currentEvent} = this.state
		
	
		return (
			<View style={{ flex: 1 }}>
				<Text style={{fontSize: 25, textAlign: 'center', margin: 5}}>{`${user_name}'s Page`}</Text>
				{(completedWorkouts.length > 0) &&<Text>Your last workout was {completedWorkouts[0].workout} on {completedWorkouts[0].dateString}</Text>}
				{Object.keys(calendarPoints).length > 0 &&
				<CalendarList style={{borderWidth: 1, borderStyle: 'solid', marginBottom: 0 }}
				horizontal={true}
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
				<Text>{currentEvent}</Text>
			</View>
		);
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
		  console.log(fakeData)
		  this.setState({completedWorkouts: fakeData})
	}
}
