import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/auth/Login';
import Sign from './pages/auth/Sign';
import FlashMessage from 'react-native-flash-message';
import Messages from './pages/Messages/Messages';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../src/styles/colors';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userSession, setUserSession] = useState();
  const AuthStack = () => {
    useEffect(() => {
      auth().onAuthStateChanged(user => {
        setUserSession(!!user);
      });
    }, []);

    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession ? (
          <Stack.Screen
            screenOptions={{headerShown: false}}
            name="AuthStack"
            component={AuthStack}
          />
        ) : (
          <Stack.Screen
            name="Messages"
            options={{
              headerShown: true,
              title: 'Dertler',
              headerTitleAlign: 'center',
              headerTintColor: colors.darkGreen,
              headerRight: () => (
                <Icon
                  name="logout"
                  color={colors.darkGreen}
                  size={28}
                  onPress={() => auth().signOut()}
                />
              ),
            }}
            component={Messages}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};
export default App;
