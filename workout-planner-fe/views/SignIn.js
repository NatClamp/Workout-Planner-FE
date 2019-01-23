import React from 'react';
import { View, StyleSheet, AsyncStorage, Text, Button } from 'react-native';
import { fbApi } from '../utils/facebookApi';

export default class SignIn extends React.Component {
  FBSignIn = async () => {
    try {
      const token = await fbApi.logIn();
      await AsyncStorage.setItem('userToken', JSON.stringify(token));
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then(response => JSON.stringify(response))
        .then(response =>
          this.props.navigation.navigate('HomePage', { currentUser: response.name }),
        );
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>BLAH BLAH BLAH</Text>
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
