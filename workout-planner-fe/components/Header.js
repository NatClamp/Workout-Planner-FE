import React from 'react';
import {
 StyleSheet, Text, View, Button 
} from 'react-native';

export default class Header extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 2, backgroundColor: 'lightgrey' }}>
        <Button title="Profile" onPress={() => navigate('UserProfile')} />
      </View>
    );
  }
}
