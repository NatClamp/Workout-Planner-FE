import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomePage from '../views/HomePage';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';
import Login from '../views/Login';
import Register from '../views/Register';
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
		navigationOptions: {
			header: null
		}
	},
	WorkoutPreview: {
		screen: WorkoutPreview,
		navigationOptions: {
			header: null
		}
	},
	CompanionScreen: {
		screen: CompanionScreen,
		navigationOptions: {
			header: null
		}
	},
	UserProfile: {
		screen: UserProfile,
		navigationOptions: {
			header: null
		}
	},
	Register: {
		screen: Register,
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
		navigationOptions: ({ navigation }) => ({
			title: 'Butt-Buster',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	...Stack
}));
