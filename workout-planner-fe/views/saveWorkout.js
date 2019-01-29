import React, { Fragment } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';
import axios from 'axios';
const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class saveWorkout extends React.Component {
  state = {
    workoutName: '',
    currentWorkout: [],
    appUserAccount: {},
  };
  render() {
    return (
      <Fragment>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Workout name"
            onChangeText={workoutName => this.setState({ workoutName })}
          />
        </View>
        <View style={{ flex: 2 }}>
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
        </View>
      </Fragment>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.navigation.state.params.currentWorkout;
    const appUserAccount = this.props.navigation.state.params.appUserAccount;
    this.setState({ currentWorkout, appUserAccount });
    console.log(this.state.currentWorkout);
  }

  postWorkout = () => {
    const workoutName = this.state.workoutName;
    const username = this.state.appUserAccount.user_name;
    // axios.post(`${URL}`);
  };
}
