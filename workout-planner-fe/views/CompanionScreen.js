import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import Model from '../components/Model';
import { Container, Header, Content, Accordion } from 'native-base';
import { ListItem, CheckBox } from 'react-native-elements';
import CompletionModal from './CompletionModal';

const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CompanionScreen extends React.Component {
  state = {
    exercises: [],
    checked: [],
  };

  checkItem = exercise => {
    const { checked } = this.state;

    if (!checked.includes(exercise)) {
      this.setState({ checked: [...checked, exercise] });
    } else {
      this.setState({ checked: checked.filter(a => a !== exercise) });
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 350, marginTop: 10 }}>
          <Model />
        </View>
        <Container>
          <Content padder>
            <View>
              {this.state.exercises.map((exercise, i) => (
                <ListItem
                  key={i}
                  title={exercise.title}
                  hideChevron
                  subtitle={`Major: ${exercise.major_muscle}`}
                  leftIcon={
                    <CheckBox
                      onPress={() => this.checkItem(exercise)}
                      checked={this.state.checked.includes(exercise)}
                    />
                  }
                />
              ))}
            </View>
          </Content>
        </Container>
        <Button
          title="Complete Workout"
          onPress={() => this.props.navigation.navigate('CompletionModal')}
        />
        {/* <TouchableOpacity style={styles.completeWorkout} title='Complete Workout'>
					<Text>Complete Workout</Text>
				</TouchableOpacity> */}
      </View>
    );
  }

  componentDidMount() {
    const currentWorkout = this.props.navigation.state.params.currentWorkout;
    this.setState({ exercises: currentWorkout });
  }
}
const styles = StyleSheet.create({
  completeWorkout: {
    padding: 10,
    margin: 10,
    fontSize: 24,
    backgroundColor: 'powderblue',
  },
});
