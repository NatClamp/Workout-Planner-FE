import React from 'react';
import { View, Button, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class Register extends React.Component {
  state = {
    user_name: '',
    actual_name: '',
    isFemale: false,
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    const radio_props = [{ label: 'Male', value: false }, { label: 'Female', value: true }];
    return (
      <View style={styles.container}>
        <Text style={styles.generalText}>Register with</Text>
        <Text style={styles.span}>curlFriend</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('actual_name', val)}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('user_name', val)}
        />

        <RadioForm
          style={styles.radio}
          radio_props={radio_props}
          buttonColor={'#2C497F'}
          selectedButtonColor={'#2C497F'}
          labelColor={'#2C497F'}
          initial={0}
          onPress={value => {
            this.setState({ isFemale: value });
          }}
        />
        <TouchableOpacity onPress={this.addToUsers} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
  addToUsers = () => {
    axios
      .post(`${URL}/users`, {
        user_name: this.state.user_name,
        actual_name: this.state.actual_name,
        isFemale: this.state.isFemale,
      })
      .then(() => {
        this.props.navigation.navigate('SuccessfulRegister');
      })
      .catch(err => {
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 55,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalText: {
    fontFamily: 'Krub-Medium',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  span: {
    fontSize: 40,
    fontFamily: 'Krub-Bold',
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  radio: {
    padding: 20,
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: 'rgba(44,73,127, 1)',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#42A5F5',
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'white',
  },
});
