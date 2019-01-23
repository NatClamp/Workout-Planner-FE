import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Alert, FlatList, ScrollView } from 'react-native';
import { Container, Header, Content, Accordion } from 'native-base';

class ExerciseModal extends Component {
	state = {
		modalVisible: false
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	render() {
		return (
			<Fragment>
				<View style={{ backgroundColor: 'lightgreen' }}>
					<Modal
						animationType='fade'
						transparent={false}
						visible={this.state.modalVisible}
						presentationStyle='overFullScreen'
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}
					>
						<ScrollView style={{ marginTop: 22 }}>
							<Header>
								<Text>Select Exercise</Text>
							</Header>

							<Accordion data={this.props.dataSource} />
							<Button
								title='Close'
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
							/>
						</ScrollView>
					</Modal>

					<TouchableHighlight
						onPress={() => {
							this.setModalVisible(true);
						}}
					>
						<Text>Click to select an exercise</Text>
					</TouchableHighlight>
				</View>
			</Fragment>
		);
	}
}

export default ExerciseModal;
