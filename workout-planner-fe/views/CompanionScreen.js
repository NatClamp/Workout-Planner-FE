import React from 'react';
import {
 StyleSheet, Text, View, Button 
} from 'react-native';
import Header from '../components/Header';

export default class CompanionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <Text>DO YOUR WORKOUT</Text>
      </View>
    );
  }
}
