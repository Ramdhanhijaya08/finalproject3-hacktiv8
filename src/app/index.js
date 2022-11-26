import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SearchScreen from '../screens/Search';
import DetailHotelScreen from '../screens/DetailHotel';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App() {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          // initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="DetailHotel" component={DetailHotelScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
