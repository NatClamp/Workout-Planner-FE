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
    err: false,
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  render() {
    const radio_props = [{ label: 'Male', value: false }, { label: 'Female', value: true }];
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Register with</Text>
        <Text style={styles.span}>curlFriend</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          isRequired={true}
          onChangeText={val => this.onChangeText('actual_name', val)}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          isRequired={true}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('user_name', val)}
        />
        <View style={styles.radioContainer}>
          <Text style={styles.generalText}>Which 3D model would you prefer?</Text>
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
        </View>

        <TouchableOpacity onPress={this.addToUsers} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {this.state.err == true && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              There are one or more required fields empty. Please try again.
            </Text>
          </View>
        )}
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
        this.setState({ err: true });
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
  error: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
    textAlign: 'center',
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'Krub-Medium',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  generalText: {
    fontFamily: 'Krub-Medium',
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  errorText: {
    fontFamily: 'Krub-Medium',
    fontSize: 15,
    padding: 0,
    margin: 0,
    color: '#2C497F',
    textAlign: 'center',
  },
  span: {
    fontSize: 40,
    fontFamily: 'Krub-Bold',
    padding: 0,
    margin: 0,
    color: '#2C497F',
  },
  radioContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
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
