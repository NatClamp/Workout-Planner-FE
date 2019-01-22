import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import HomePage from '../views/HomePage';
import WorkoutPreview from '../views/WorkoutPreview';
import CompanionScreen from '../views/CompanionScreen';
import UserProfile from '../views/UserProfile';

const Stack = {
	Home: {
		screen: HomePage,
		navigationOptions: {
			title: 'Home'
		}
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
