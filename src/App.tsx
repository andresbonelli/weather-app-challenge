import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home.tsx';
import Details from './pages/Detail.tsx';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, title: 'Home Screen'}}
        />
        <Stack.Screen
          name="details"
          component={Details}
          options={{headerShown: false, title: 'Details Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
