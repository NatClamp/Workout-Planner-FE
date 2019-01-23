import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import HomePage from './HomePage';
// import SignUp from './SignUp';
import API_KEY from '../config.js';

export default class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  componentDidMount() {
    this.logIn();
  }

  logIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync(`${API_KEY.facebook_api_key}`, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then(response => response.json())
          .then(response =>
            this.props.navigation.navigate('HomePage', { currentUser: response.name }),
          );
      } else {
        Alert.alert('HELP');
        // go to sign up?
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
