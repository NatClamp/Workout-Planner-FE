import React, { Component, Fragment } from 'react';
import {
  StyleSheet, Text, View, Button, Image, TouchableOpacity,
} from 'react-native';

export default class CompletionModal extends Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.congratulations}>Congratulations</Text>
          <Text style={styles.subCongratulations}>You've done great, don't forget to stretch!</Text>
        </View>

        <View style={styles.innerContainerButtons}>
          <View styles={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Text style={styles.linkText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('UserProfile')}
            >
              <Text style={styles.linkText}>Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 20,
    marginTop: 70,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainerButtons: {
    padding: 30,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 250,
    margin: 10,
    backgroundColor: 'rgba(44,73,127, 1)',
    borderRadius: 4,
  },
  linkText: {
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  congratulations: {
    fontFamily: 'Krub-Medium',
    fontSize: 20,
    color: 'rgba(44,73,127, 1)',
  },
  subCongratulations: {
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    color: 'rgba(44,73,127, 0.6)',
  },
});
