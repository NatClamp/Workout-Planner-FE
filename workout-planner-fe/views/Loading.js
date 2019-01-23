import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import SignIn from './SignIn';

export default class Loading extends React.Component {
  userTokenInStorage = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        this.props.navigation.navigate('HomePage');
      } else {
        this.props.navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  componentDidMount() {
    this.userTokenInStorage();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
