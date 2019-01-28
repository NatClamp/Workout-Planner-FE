import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import WorkoutPreview from './views/WorkoutPreview';
import CompanionScreen from './views/CompanionScreen';
import UserProfile from './views/UserProfile';
import MuscleScreen from './views/MuscleScreen';
import ExerciseList from './views/ExerciseList';
import Loading from './views/Loading';
import HomePage from './views/HomePage';
import SignIn from './views/SignIn';
import CreateExerciseForm from './views/CreateExerciseForm';
import CompletionModal from './views/CompletionModal';

const ProfileIcon = ({ navigation }) => (
	<TouchableOpacity
		style={{ padding: 5, paddingLeft: 10, paddingRight: 15 }}
		onPress={() => {
			navigation.navigate('UserProfile');
		}}
	>
		<Text style={{ color: 'white', fontSize: 25 }}>
			<Icon name='md-person' size={30} />
		</Text>
	</TouchableOpacity>
);

const WorkoutStack = createStackNavigator(
	{
		Home: {
			screen: HomePage,
			navigationOptions: ({ navigation }) => ({
				title: 'Home',
				headerRight: <ProfileIcon navigation={navigation} />
			})
		},
		WorkoutPreview: {
			screen: WorkoutPreview,
			navigationOptions: ({ navigation }) => ({
				title: 'Workout Preview',
				headerRight: <ProfileIcon navigation={navigation} />
			})
		},
		CompanionScreen: {
			screen: CompanionScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Workout',
				headerRight: <ProfileIcon navigation={navigation} />
			})
		},
		MuscleScreen: {
			screen: MuscleScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Choose a muscle',
				headerRight: <ProfileIcon navigation={navigation} />
			})
		},
		ExerciseList: {
			screen: ExerciseList,
			navigationOptions: ({ navigation }) => ({
				title: 'Exercises',
				headerRight: <ProfileIcon navigation={navigation} />
			})
		},
		UserProfile: {
			screen: UserProfile
		},
		CompletionModal: {
			screen: CompletionModal,
			navigationOptions: {
				header: null
			}
		},
		CreateExerciseForm: {
			screen: CreateExerciseForm
		}
	},
	{
		initialRouteName: 'Home'
	}
);

const AuthStack = createStackNavigator({
	HomePage: {
		screen: WorkoutStack,
		navigationOptions: {
			header: null
		}
	},
	SignIn: {
		screen: SignIn,
		navigationOptions: {
			title: 'Sign In'
		}
	}
});

const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthentificationCheck: Loading,
			Auth: AuthStack
		},
		{
			initialRouteName: 'AuthentificationCheck'
		}
	)
);

export default AppContainer;
