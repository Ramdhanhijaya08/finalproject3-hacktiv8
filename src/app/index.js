import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import SearchScreen from '../screens/Search';
import DetailHotelScreen from '../screens/DetailHotel';
import ContactReservationScreen from '../screens/ContactReservation';
import SelectDateScreen from '../screens/SelectDate';
import PaymentSceen from '../screens/Payment';
import BookingHistoryScreen from '../screens/BookingHistory';
import BookmarkScreen from '../screens/Bookmark';

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
          // initialRouteName="SelectDate"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="DetailHotel" component={DetailHotelScreen} />
          <Stack.Screen
            name="ContactReservation"
            component={ContactReservationScreen}
          />
          <Stack.Screen name="SelectDate" component={SelectDateScreen} />
          <Stack.Screen name="Payment" component={PaymentSceen} />
          <Stack.Screen
            name="BookingHistory"
            component={BookingHistoryScreen}
          />
          <Stack.Screen name="Bookmark" component={BookmarkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
