import React, { Component, Fragment } from 'react';
import { Text, ScrollView, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Model from '../components/Model';
import { Dropdown } from 'react-native-material-dropdown';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CreateExerciseForm extends Component {
	state = {
		title: '',
		major_muscle: '',
		minor_muscle: '',
		created_by: '',
		muscles: []
	};

	render() {
		const majorList = this.state.muscles.reduce((acc, currValue) => {
			const newObj = {};
			const value = 'value';
			newObj[value] = currValue.muscle_name;
			acc.push(newObj);
			console.log(acc);
			return acc;
		}, []);
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
								<Container>
									<Dropdown data={majorList} label='Major Muscle' />
									<Dropdown data={majorList} label='Minor Muscle' />
									<TouchableOpacity>
										<Text>Submit</Text>
									</TouchableOpacity>
								</Container>
							</Form>
						</Content>
					</Container>
				</ScrollView>
			</View>
		);
	}

	componentDidMount() {
		return fetch(`${URL}/muscles`)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						muscles: responseJson.muscles
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
}
