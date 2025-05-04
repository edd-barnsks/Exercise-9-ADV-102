//import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import LoginScreen from './screens/LoginScreen';
import MyTabs from './navigation/MyTabs';
import StopWatchScreen from './screens/StopWatchScreen';
import RegisterScreen from './screens/RegisterScreen';
import QuizScreen from './screens/QuizScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={MyTabs} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Stopwatch" component={StopWatchScreen} />
        <Stack.Screen name="Exercises" component={ExerciseScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

