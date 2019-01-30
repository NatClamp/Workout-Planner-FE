import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Button, Alert, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';

export default class WorkoutPreviewList extends Component {
  state = {
    currentWorkout: [],
    appUserAccount: {},
  };
  render() {
    return (
      <Fragment>
        <View style={{ flex: 1 }}>
          <Container>
            <Content>
              {this.state.currentWorkout.map((item, index) => {
                return (
                  <Card key={index}>
                    <CardItem header>
                      <Text style={styles.generalText}>{item.title}</Text>
                    </CardItem>
                  </Card>
                );
              })}
            </Content>
          </Container>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() =>
              this.props.navigation.navigate('postWorkout', {
                currentWorkout: this.state.currentWorkout,
                appUserAccount: this.state.appUserAccount,
              })
            }
          >
            <Text style={styles.linkText}>Share Workout</Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.currentWorkout;
    const appUserAccount = this.props.appUserAccount;
    this.setState({ currentWorkout, appUserAccount });
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    margin: 10,
    flex: 1,
  },
  linkContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(44,73,127, 0.7)',
    borderColor: 'rgba(44,73,127, 1)',
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
    textAlign: 'center',
  },
  generalText: {
    fontSize: 18,
    fontFamily: 'Krub-Medium',
    color: 'rgba(44,73,127, 1)',
    textAlign: 'center',
  },
});
