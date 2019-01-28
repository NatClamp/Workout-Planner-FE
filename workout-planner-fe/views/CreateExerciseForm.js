import React, { Component, Fragment } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Button } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Model from '../components/Model';
export default class CreateExerciseForm extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Container>
						<Model />
						<Content>
							<Form>
								<Item>
									<Input placeholder='Exercise name...' />
								</Item>
								<Item last>
									<Input placeholder='Major Muscle...' />
								</Item>
								<Item last>
									<Input placeholder='Minor Muscle...' />
								</Item>
								<Button title='Submit Exercise' />
							</Form>
						</Content>
					</Container>
				</ScrollView>
			</View>
		);
	}
}

//
