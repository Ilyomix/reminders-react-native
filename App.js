// @flow

import { AppLoading, LinearGradient } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import TodoView from './screens/TodoView';
import store, { persistor } from './store/index';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  console.log(store.getState());
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider
            mapping={mapping}
            theme={lightTheme}>
            <Layout style={styles.container}>
              <StatusBar backgroundColor="#c51162" />
              <TodoView />
            </Layout>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
