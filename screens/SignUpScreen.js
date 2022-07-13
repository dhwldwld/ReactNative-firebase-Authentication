import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                if (user) {
                    navigation.replace('Auth');
                }
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error.message);
            });
    };

    return (
        <KeyboardAvoidingView
            className="justify-center items-center flex-1"
            behavior="padding"
        >
            <View className="w-4/5">
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    className=" bg-white px-4 py-2 rounded-lg mt-2"
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    className=" bg-white px-4 py-2 rounded-lg mt-2"
                />
            </View>
            <View className=" w-3/5 justify-center items-center mt-8">
                <TouchableOpacity
                    onPress={handleSignUp}
                    className=" bg-white w-full p-3 mt-2 border border-solid border-sky-500 rounded-lg"
                >
                    <Text className=" text-sky-500 font-bold text-base text-center">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;
