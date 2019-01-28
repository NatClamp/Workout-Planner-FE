import React from 'react';
import { View, StyleSheet, AsyncStorage, Text, Button } from 'react-native';
import { fbApi } from '../utils/facebookApi';

export default class SignIn extends React.Component {
  FBSignIn = async () => {
    try {
      const { token } = await fbApi.logIn();
      await AsyncStorage.setItem('userToken', JSON.stringify(token));
      await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then(response => response.json())
        .then(response =>
          AsyncStorage.setItem('currentUser', JSON.stringify(response.name)).then(() =>
            this.props.navigation.navigate('Home', { currentUser: response.name }),
          ),
        );
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in with Facebook" onPress={this.FBSignIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
