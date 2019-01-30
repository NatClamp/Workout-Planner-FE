import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

export default class SuccessfulRegister extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.body}>  Congratulations on signing up with curlFriend </Text>
        <View>
          <TouchableOpacity style={styles.btn} title="Proceed to the Home Page" onPress={() => this.props.navigation.navigate('Home')}><Text>Proceed to Home Page</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: 500,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    backgroundColor: 'rgba(44,73,127, 0.5)',
    borderRadius: 4,
    padding: 10,
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#fff',
  },
});
