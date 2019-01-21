import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, Alert, FlatList } from 'react-native';

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
						<View style={{ marginTop: 22 }}>
							<View>
								<FlatList
									data={this.props.dataSource}
									renderItem={({ item }) => <Text>{item.title}</Text>}
									keyExtractor={({ title }) => title}
								/>

								<TouchableHighlight
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
								>
									<Text>Hide Modal</Text>
								</TouchableHighlight>
							</View>
						</View>
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
