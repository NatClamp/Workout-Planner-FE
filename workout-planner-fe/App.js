import React from 'react';
import { AppLoading, SplashScreen, Font } from 'expo';
import { TouchableOpacity, Text } from 'react-native';
import AppContainer from './navigation/Navigators';

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };
  render() {
    if (this.state.appIsReady) {
      return <AppContainer />;
    } else {
      return <AppLoading />;
    }
  }

  componentDidMount() {
    SplashScreen.preventAutoHide();
    this.loadResourcesAsync()
      .then(() => this.setState({ appIsReady: true }))
      .catch(error =>
        console.error(`Unexpected error thrown when loading:
    ${error.stack}`),
      );
  }

  async loadResourcesAsync() {
    return Promise.all([
      Font.loadAsync({
        'Krub-Regular': require('./assets/Krub-Regular.ttf'),
      }),
      Font.loadAsync({
        'Krub-Bold': require('./assets/Krub-Bold.ttf'),
      }),
      Font.loadAsync({
        'Krub-BoldItalic': require('./assets/Krub-BoldItalic.ttf'),
      }),
      Font.loadAsync({
        'Krub-ExtraLight': require('./assets/Krub-ExtraLight.ttf'),
      }),
      Font.loadAsync({
        'Krub-ExtraLightItalic': require('./assets/Krub-ExtraLightItalic.ttf'),
      }),
      Font.loadAsync({
        'Krub-Italic': require('./assets/Krub-Italic.ttf'),
      }),
      Font.loadAsync({
        'Krub-Light': require('./assets/Krub-Light.ttf'),
      }),
      Font.loadAsync({
        'Krub-LightItalic': require('./assets/Krub-LightItalic.ttf'),
      }),
      Font.loadAsync({
        'Krub-Medium': require('./assets/Krub-Medium.ttf'),
      }),
      Font.loadAsync({
        'Krub-MediumItalic': require('./assets/Krub-MediumItalic.ttf'),
      }),
      Font.loadAsync({
        'Krub-SemiBold': require('./assets/Krub-SemiBold.ttf'),
      }),
      Font.loadAsync({
        'Krub-SemiBoldItalic': require('./assets/Krub-SemiBoldItalic.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Regular': require('./assets/Roboto-Regular.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Thin': require('./assets/Roboto-Thin.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Medium': require('./assets/Roboto-Medium.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Bold': require('./assets/Roboto-Bold.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Italic': require('./assets/Roboto-Italic.ttf'),
      }),
      Font.loadAsync({
        'Roboto-Light': require('./assets/Roboto-Light.ttf'),
      }),
    ]);
  }
}
