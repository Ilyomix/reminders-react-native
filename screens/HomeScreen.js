import React from 'react';
import * as Expo from 'expo';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { TopNavigation, TopNavigationProps } from 'react-native-ui-kitten';
import { LinearGradient } from 'expo-linear-gradient';

import TodoList from '../components/TodoList';

export default function HomeScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#f50057', '#f50057']}
        style={{ alignItems: 'center', }}
        start={{x: 0, y: 0.75}}
        end={{x: 1, y: 0.25}}
        style={styleTopNavigationLinearGradient.main}
      >
        <TopNavigation
          title='Reminders'
          subtitle='0 reminder(s) in progress'
          titleStyle={styleTopNavigation.title}
          subtitleStyle={styleTopNavigation.subtitle}
          style={styleTopNavigation.main}
        />
      </LinearGradient>
      <TodoList />
    </View>
  );
};

const styleTopNavigation = StyleSheet.create({
    main: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      padding: 7,
    },
    title: {
      color: '#ffffff',
    },
    subtitle: {
      color: '#ffffff',
    },
});

const styleTopNavigationLinearGradient = StyleSheet.create({
  main: {
    padding: 7,
  }
});

const styleBottomNavigation = StyleSheet.create({
});
