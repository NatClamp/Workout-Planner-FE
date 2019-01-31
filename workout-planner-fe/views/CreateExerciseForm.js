import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  StyleSheet,
} from 'react-native';
import { Container, Content, Form, Item } from 'native-base';
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
    loggedInUser: {},
    err: false,
  };

  assignUser = async () => {
    const user = await AsyncStorage.getItem('userAccount');
    const loggedInUser = JSON.parse(user);
    this.setState({ loggedInUser });
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
      <View style={styles.outerContainer}>
        <Container>
          <Content>
            <Form>
              <Item style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                <TextInput
                  style={styles.inputOne}
                  placeholder="Exercise name..."
                  onChangeText={title => this.setState({ title })}
                  value={this.state.title}
                />
                <TextInput
                  style={styles.inputTwo}
                  placeholder="Exercise description..."
                  onChangeText={content => this.setState({ content })}
                  value={this.state.content}
                  numberOfLines={4}
                />
              </Item>
              <Container style={{ margin: 20 }}>
                <Dropdown
                  style={styles.dropdownOne}
                  data={majorList}
                  label="Major Muscle"
                  onChangeText={value => {
                    this.setState({ major_muscle: value });
                  }}
                />
                <Dropdown
                  style={styles.dropdownTwo}
                  data={majorList}
                  label="Minor Muscle"
                  onChangeText={value => {
                    this.setState({ minor_muscle: value });
                  }}
                />
                <TouchableOpacity style={styles.button} onPress={this.addToExercises}>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Submit</Text>
                </TouchableOpacity>
              </Container>
            </Form>
          </Content>
        </Container>

        {this.state.err == true && (
          <View>
            <Text>There are one or more required fields empty. Please try again.</Text>
          </View>
        )}
      </View>
    );
  }

  componentDidMount() {
    this.assignUser();
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

  addToExercises = () => {
    const obj = {
      title: this.state.title,
      content: this.state.content,
      major_muscle: this.state.major_muscle,
      minor_muscle: this.state.minor_muscle,
      created_by: this.state.loggedInUser._id,
    };
    axios
      .post(`${URL}/exercises`, obj)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        this.setState({ err: true });
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    margin: 10,
  },
  button: {
    padding: 10,
    width: 100,
    margin: 20,
    backgroundColor: 'rgba(44,73,127, 0.5)',
    borderRadius: 4,
    alignSelf: 'center',
  },

  inputOne: {
    width: 250,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    margin: 15,
  },
  inputTwo: {
    width: 250,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    margin: 15,
  },
});
