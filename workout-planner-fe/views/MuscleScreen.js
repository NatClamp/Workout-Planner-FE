import React, { Component, Fragment } from 'react';
import { Container, Header, Icon, Accordion, Left, Body } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

const swipeoutBtns = [
  {
    text: 'Button',
  },
];

export default class MuscleScreen extends Component {
  state = {
    muscles: [],
    modalVisible: false,
    muscleExercises: [],
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <Fragment>
        <View>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
            presentationStyle="overFullScreen"
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <ScrollView style={{ marginTop: 22 }}>
              <Header style={{ textAlign: 'left' }}>
                <Left>
                  <Icon
                    name="md-arrow-back"
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  />
                </Left>
                <Body>
                  <Text>Select Exercise</Text>
                </Body>
              </Header>

              <View>
                <Swipeout right={swipeoutBtns}>
                  <Fragment>
                    <Accordion data={this.state.muscleExercises} />
                  </Fragment>
                </Swipeout>
              </View>
            </ScrollView>
          </Modal>

          <TouchableHighlight>
            <ScrollView>
              <Swipeout right={swipeoutBtns}>
                <Fragment>
                  {this.state.muscles.map((item, key) => (
                    <Text
                      key={key}
                      style={styles.TextStyle}
                      onPress={() => {
                        this.getExerciseByMuscle(item.muscle_name);
                        this.setModalVisible(true);
                      }}
                    >
                      {item.muscle_name}
                    </Text>
                  ))}
                </Fragment>
              </Swipeout>
            </ScrollView>
          </TouchableHighlight>
        </View>
      </Fragment>
    );
  }
  componentDidMount() {
    return fetch('http://192.168.230.34:9000/api/muscles')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            muscles: responseJson.muscles,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  getExerciseByMuscle = muscle_name => {
    return fetch(`http://192.168.230.34:9000/api/exercises/muscle/${muscle_name}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            muscleExercises: responseJson.exercises,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleClick = () => {
    getExerciseByMuscle();
  };
}

const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 15,
    textAlign: 'left',
    backgroundColor: 'green',
    padding: 10,
    borderColor: 'black',
    borderWidth: 4,
  },
});
