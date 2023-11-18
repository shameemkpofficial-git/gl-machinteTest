import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screns/login';
import SignUp from '../screns/signup';
import ListUsers from '../screns/listUsers';
import EditProfile from '../screns/editProfile';

const Stack = createNativeStackNavigator();

// const AuthStack = () => (
//   <Stack.Navigator initialRouteName="Login">
//     <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />
//     <Stack.Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

// const AppRoutesStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen component={ListUsers} name="ListUsers" options={{ headerShown: false }} />
//     <Stack.Screen component={EditProfile} name="EditProfile" options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

const AppNav = () => (
  <Stack.Navigator>
    <Stack.Screen component={Login} name="Login" options={{ headerShown: false }} />
    <Stack.Screen component={SignUp} name="SignUp" options={{ headerShown: false }} />
    <Stack.Screen component={ListUsers} name="ListUsers" options={{ headerShown: false }} />
    <Stack.Screen component={EditProfile} name="EditProfile" options={{ headerShown: false }} />
   
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
}
