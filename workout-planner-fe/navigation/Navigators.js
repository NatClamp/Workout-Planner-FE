import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomePage from '../views/HomePage';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';
import Login from '../views/Login';
import MuscleList from '../components/MuscleList';
import { Icon } from 'native-base';
import { Button } from 'react-native-elements';

const DrawerIcon = ({ navigation }) => {
	return (
		<TouchableOpacity
			style={{ padding: 5, paddingLeft: 10, paddingRight: 15 }}
			onPress={() => {
				navigation.toggleDrawer();
			}}
		>
			<Text style={{ color: 'white', fontSize: 25 }}>
				<Icon name='menu' />
			</Text>
		</TouchableOpacity>
	);
};

const Stack = {
	Login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	Home: {
		screen: HomePage,
		navigationOptions: ({ navigation }) => ({
			title: 'Home',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	WorkoutPreview: {
		screen: WorkoutPreview,
		navigationOptions: ({ navigation }) => ({
			title: 'Workout Preview',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	CompanionScreen: {
		screen: CompanionScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Workout Companion',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	UserProfile: {
		screen: UserProfile,
		navigationOptions: ({ navigation }) => ({
			title: 'Profile',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	MuscleList: {
		screen: MuscleList,
		navigationOptions: {
			header: null
		}
	}
};

const DrawerRoutes = {
	Home: {
		name: 'Home',
		screen: createStackNavigator(Stack, { initialRouteName: 'Home' })
	},
	Profile: {
		name: 'Profile',
		screen: createStackNavigator(Stack, { initialRouteName: 'UserProfile' })
	},
	Logout: {
		name: 'logout',
		screen: createStackNavigator(Stack, { initialRouteName: 'Login' })
	}
};

export default (RootNavigator = createStackNavigator({
	Drawer: {
		name: 'Drawer',
		screen: createDrawerNavigator(DrawerRoutes),
		navigationOptions: {
			title: 'Butt-Buster',
			header: null
		}
	},
	...Stack
}));
