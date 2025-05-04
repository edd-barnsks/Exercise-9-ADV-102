import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ExerciseScreen from '../screens/ExerciseScreen';
import LoginScreen from '../screens/LoginScreen';
//import LoginScreen from '../screens/StopWatchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Exercises">
        <Stack.Screen name="Exercises" component={ExerciseScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
