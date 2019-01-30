import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';
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
        <Image style={styles.logo} source={require('../assets/logo2.png')} />
        <Text style={styles.curlFriend}>curlFriend</Text>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={this.FBSignIn} style={styles.innerContainer}>
            <Image style={styles.image} source={require('../assets/fb-logo.png')} />
            <Text style={styles.generalText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.registerText}>Don't have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  curlFriend: {
    fontSize: 30,
    fontFamily: 'Krub-Bold',
    color: '#2C497F',
  },
  generalText: {
    color: '#2C497F',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: 'rgba(44,73,127, 0.7)',
  },
  image: {
    height: 60,
    width: 60,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
});
