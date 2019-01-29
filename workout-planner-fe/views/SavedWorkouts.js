import React, { Component, Fragment } from 'react';
import { Container, Content, Text, Card, CardItem } from 'native-base';

export default class SavedWorkouts extends Component {
	state = {
		workout: [],
		workouts: [
			{
				name: 'workout1',
				exercises: 'jump'
			},
			{
				name: 'workout2',
				exercises: 'squat'
			},
			{
				name: 'workout3',
				exercises: 'stars'
			},
			{
				name: 'workout4',
				exercises: 'lunge'
			}
		]
	};
	alertItemName = (item) => {
		alert(item.name);
	};
	render() {
		return (
			<Container>
				<Content>
					{this.state.workouts.map((item, index) => {
						return (
							<Card key={index}>
								<Fragment>
									<CardItem header>
										<Text>{`${item.name}`}</Text>
									</CardItem>
									<CardItem>
										<Text>{`Includes: ${item.exercises}`}</Text>
									</CardItem>
									<CardItem
										button
										onPress={() => {
											//function to send workout to homepage;
										}}
									>
										<Text>Do this Workout</Text>
									</CardItem>
								</Fragment>
							</Card>
						);
					})}
				</Content>
			</Container>
		);
	}
}
