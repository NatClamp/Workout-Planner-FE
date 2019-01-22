import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomePage from '../views/HomePage';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';
import { Icon } from 'native-base';

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
	Home: {
		screen: HomePage,
		navigationOptions: ({ navigation }) => ({
			title: 'Home',
			headerLeft: <DrawerIcon navigation={navigation} />
		})
	},
	WorkoutPreview: {
		screen: WorkoutPreview,
		navigationOptions: {
			title: 'Preview Workout'
		}
	},
	CompanionScreen: {
		screen: CompanionScreen,
		navigationOptions: {
			title: 'Your Workout'
		}
	},
	UserProfile: {
		screen: UserProfile,
		navigationOptions: {
			title: 'Profile'
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
	}
};

export default (RootNavigator = createStackNavigator(
	{
		Drawer: {
			name: 'Drawer',
			screen: createDrawerNavigator(DrawerRoutes)
		},
		...Stack
	},
	{
		headerMode: 'none'
	}
));
