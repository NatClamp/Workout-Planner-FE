import React, { Component, Fragment } from 'react';
import { Text, ScrollView, View, Button, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Model from '../components/Model';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CreateExerciseForm extends Component {
	state = {
		title: '',
		content: '',
		major_muscle: '',
		minor_muscle: '',
		muscles: [],
		loggedInUser: {}
	};

	assignUser = async () => {
		const user = await AsyncStorage.getItem('userAccount');
		const loggedInUser = JSON.parse(user);
		this.setState({ loggedInUser }, () => {
			console.log(this.state.loggedInUser);
		});
	};

	render() {
		const majorList = this.state.muscles.reduce((acc, currValue) => {
			const newObj = {};
			const value = 'value';
			newObj[value] = currValue.muscle_name;
			acc.push(newObj);
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
									<TextInput
										placeholder='Exercise description...'
										onChangeText={(content) => this.setState({ content })}
										value={this.state.content}
									/>
								</Item>
								<Container>
									<Dropdown
										data={majorList}
										label='Major Muscle'
										onChangeText={(value) => {
											this.setState({ major_muscle: value });
										}}
									/>
									<Dropdown
										data={majorList}
										label='Minor Muscle'
										onChangeText={(value) => {
											this.setState({ minor_muscle: value });
										}}
									/>
									<TouchableOpacity onPress={this.addToExercises}>
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
		this.assignUser();
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

	addToExercises = () => {
		const obj = {
			title: this.state.title,
			content: this.state.content,
			major_muscle: this.state.major_muscle,
			minor_muscle: this.state.minor_muscle,
			created_by: this.state.loggedInUser._id
		};
		console.log(obj);
		axios
			.post(`${URL}/exercises`, obj, console.log('heyyyyyy'))
			.then(() => {
				console.log('hi');
				this.props.navigation.navigate('Home');
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
