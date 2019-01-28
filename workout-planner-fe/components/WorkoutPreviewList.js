import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Text } from 'native-base';

class WorkoutPreviewList extends Component {
  state = {
    currentWorkout: [],
  };
  render() {
    // console.log(this.props);
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
              })
            }
          />
        </View>
      </Fragment>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.currentWorkout;
    this.setState({ currentWorkout });
  }
}

export default WorkoutPreviewList;
