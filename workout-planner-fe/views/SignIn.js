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
import { Row } from 'native-base';

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
        <Text style={styles.curlFriend}>curlFriend</Text>
        <View style={styles.innerContainer}>
          <Image style={styles.image} source={require('../assets/fb-logo.png')} />
          <TouchableOpacity onPress={this.FBSignIn}>
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
    margin: 20,
  },
  curlFriend: {
    fontSize: 50,
    marginBottom: 20,
    fontFamily: 'Krub-Bold',
  },
  generalText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  image: {
    height: 80,
    width: 80,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
});
