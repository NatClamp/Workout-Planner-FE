import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Accordion, Container, Item, Icon, Input, Button } from 'native-base';

class ExerciseList extends Component {
	state = {
		exercises: []
	};
	render() {
		return (
			<Fragment>
				<View style={{ flex: 1 }}>
					<Container
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center'
						}}
						searchBar
						rounded
					>
						<Item
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center'
							}}
						>
							<Icon name='ios-search' />
							<Input placeholder='Search...' />
						</Item>
						<Button
							style={{
								paddingRight: 10,
								paddingTop: 10
							}}
							transparent
						>
							<Text>Search</Text>
						</Button>
					</Container>
					<Accordion data={this.state.exercises} />
				</View>
			</Fragment>
		);
	}
	componentDidMount() {
		return fetch('https://nc-project-be.herokuapp.com/api/exercises')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						exercises: responseJson.exercises
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

export default ExerciseList;
