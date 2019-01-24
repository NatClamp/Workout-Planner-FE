import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
// import RootNavigator from './navigation/Navigators';
import { Icon } from 'native-base';
import FontAwesome, { Icons } from 'react-native-fontawesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import WorkoutPreview from './views/WorkoutPreview';
import CompanionScreen from './views/CompanionScreen';
import UserProfile from './views/UserProfile';
import MuscleScreen from './views/MuscleScreen';
import ExerciseList from './views/ExerciseList';

import Loading from './views/Loading';
import HomePage from './views/HomePage';
import SignIn from './views/SignIn';

const ProfileIcon = ({ navigation }) => (
  <TouchableOpacity
    style={{ padding: 5, paddingLeft: 10, paddingRight: 15 }}
    onPress={() => {
      navigation.navigate('UserProfile');
    }}
  >
    <Text style={{ color: 'white', fontSize: 25 }}>
      <Icon name="md-person" size={30} />
    </Text>
  </TouchableOpacity>
);

const WorkoutStack = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        headerRight: <ProfileIcon navigation={navigation} />,
      }),
    },
    WorkoutPreview: {
      screen: WorkoutPreview,
      navigationOptions: {
        title: 'Workout Preview',
      },
    },
    CompanionScreen: {
      screen: CompanionScreen,
      navigationOptions: {
        title: 'Workout Companion',
      },
    },
    MuscleScreen: {
      screen: MuscleScreen,
      navigationOptions: {
        title: 'Choose a Muscle',
      },
    },
    ExerciseList: {
      screen: ExerciseList,
      navigationOptions: {
        title: 'Choose an Exercise',
      },
    },
    UserProfile: {
      screen: UserProfile,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

// const AppTabs = createBottomTabNavigator({
//   Home: {
//     screen: HomePage,
//     title: 'Home',
//   },
//   Profile: {
//     screen: 'UserProfile',
//   },
// });

const AuthStack = createStackNavigator({
  HomePage: {
    screen: WorkoutStack,
    navigationOptions: {
      header: null,
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
    },
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthentificationCheck: Loading,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthentificationCheck',
    },
  ),
);

export default AppContainer;
