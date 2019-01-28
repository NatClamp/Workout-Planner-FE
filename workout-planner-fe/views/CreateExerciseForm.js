import React, { Component, Fragment } from 'react';
import { Text, ScrollView, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Model from '../components/Model';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CreateExerciseForm extends Component {
	state = {
		title: '',
		major_muscle: '',
		minor_muscle: '',
		created_by: ''
	};
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Container>
						<Model />
						<Content>
							<Form>
								<Item>
									<TextInput
										placeholder='Exercise name...'
										onChangeText={(title) => this.setState({ title })}
										value={this.state.title}
									/>
								</Item>
								<TouchableOpacity onPress={() => this.submit()}>
									<Text>Submit</Text>
								</TouchableOpacity>
							</Form>
						</Content>
					</Container>
				</ScrollView>
			</View>
		);
	}

	submit() {
		let fullExercise = {};
		(fullExercise.title = this.state.title),
			(fullExercise.major_muscle = this.state.major_muscle),
			(fullExercise.minor_muscle = this.state.minor_muscle),
			(url = `${URL}/exercises`);

		fetch(url, {
			method: 'POST',
			body: JSON.stringify(fullExercise)
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	}
}
