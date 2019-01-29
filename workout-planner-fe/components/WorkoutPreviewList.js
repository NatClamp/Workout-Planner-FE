import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';

class WorkoutPreviewList extends Component {
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
                      <Text>{item.title}</Text>
                    </CardItem>
                  </Card>
                );
              })}
            </Content>
          </Container>
          <Button
            title="Save Workout for later"
            onPress={() =>
              this.props.navigation.navigate('saveWorkout', {
                currentWorkout: this.state.currentWorkout,
                appUserAccount: this.state.appUserAccount,
              })
            }
          />
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

export default WorkoutPreviewList;
