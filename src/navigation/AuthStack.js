import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Authorization from '../screens/Authorization';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Authorization" component={Authorization} />
    </Stack.Navigator>
  );
};

export default AppStack;
