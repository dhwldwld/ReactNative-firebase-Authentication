import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const onGoogleButtonPress = async () => {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
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
                    onPress={() =>
                        onGoogleButtonPress().then(() =>
                            console.log('Signed in with Google!')
                        )
                    }
                    className=" bg-sky-500 w-full p-3 rounded-lg"
                >
                    <Text className=" text-white font-bold text-base text-center">
                        Google Sign-In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLogin}
                    className=" bg-sky-500 w-full p-3 mt-2 rounded-lg"
                >
                    <Text className=" text-white font-bold text-base text-center">
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
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

export default LoginScreen;
