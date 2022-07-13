import React, { useState, useEffect } from 'react';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// component
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        GoogleSignin.configure({
          webClientId:
            '798890800910-o6lfcafsp0cc9r12hst2q16d9crk21k2.apps.googleusercontent.com'
        });
    }, []);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);
        return unsubscribe;
    }, []);

    const Auth = () => {
        if (initializing) return null;

        if (!user) {
            return (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                </Stack.Navigator>
            );
        }

        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <TailwindProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        options={{headerShown : false}}
                        name="Auth"
                        component={Auth}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                    />
                </Stack.Navigator>
            </TailwindProvider>
        </NavigationContainer>
    );
};

export default App;
