import React from 'react';
import SignUpData from '../Signup/Signup';
import SignUpAdrress from '../Signup/SignupAddress';
import SignupCar from '../Signup/SignupCar';
import SignupPayment from '../Signup/SignupPayment';
import Selection from '../Signup/SignupSelection';
import Login from '../Login/Login';

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.charade,
          shadowColor: Colors.charade,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAdrress"
        component={SignUpAdrress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupCar"
        component={SignupCar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupPayment"
        component={SignupPayment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Selection"
        component={Selection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
