import React, { Component, Fragment } from 'react';
import { Container, Header, Icon, Left, Body, Content, Card, CardItem } from 'native-base';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Alert, ScrollView } from 'react-native';

const URL = 'https://nc-project-be.herokuapp.com/api/';

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
    const { getParam } = this.props.navigation;
    const addExerciseToWorkout = getParam('addExerciseToWorkout');
    return this.state.muscles.length === 0 ? (
      <Text>Loading...</Text>
    ) : (
      <Fragment>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <View>
            <Header style={styles.modalHeader}>
              <Left style={{ marginLeft: 5 }}>
                <Icon
                  name="md-arrow-back"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </Left>
              <Body>
                <Text style={styles.modalHeaderText}>Select Exercise</Text>
              </Body>
            </Header>

            <ScrollView style={styles.outerContainer}>
              {this.state.muscleExercises.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.linkContainer}
                  onPress={() => {
                    addExerciseToWorkout(item.title);
                    Alert.alert(
                      'Successful addition',
                      `${item.title} has been added to your workout`,
                      [
                        {
                          text: 'Preview Workout',
                          onPress: () => this.props.navigation.navigate('Home'),
                        },
                        {
                          text: 'Add another',
                          onPress: () => this.setModalVisible(!this.state.modalVisible),
                        },
                      ],
                    );
                  }}
                >
                  <Text style={styles.linkText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        <ScrollView style={styles.outerContainer}>
          {this.state.muscles.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.linkContainer}
              onPress={() => {
                this.getExerciseByMuscle(item.muscle_name);
                this.setModalVisible(true);
              }}
            >
              <Text style={styles.linkText}>
                {item.muscle_name.slice(0, 1).toUpperCase() + item.muscle_name.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Fragment>
    );
  }
  componentDidMount() {
    return fetch(`${URL}/muscles`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          muscles: responseJson.muscles,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  getExerciseByMuscle = muscle_name => {
    return fetch(`${URL}/exercises/muscle/${muscle_name}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.msg) {
          Alert.alert('Sorry', "There currently aren't any exercises for this muscle group");
          this.setModalVisible(!this.state.modalVisible);
        } else {
          this.setState({
            muscleExercises: responseJson.exercises,
          });
        }
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
  outerContainer: {
    margin: 10,
  },
  modalHeader: {
    backgroundColor: '#fff',
  },
  linkContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    borderColor: 'rgba(44,73,127, 1)',
    borderWidth: 2,
    borderRadius: 4,
  },
  linkText: {
    fontSize: 15,
    fontFamily: 'Roboto-Light',
    color: '#fff',
    textAlign: 'left',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
