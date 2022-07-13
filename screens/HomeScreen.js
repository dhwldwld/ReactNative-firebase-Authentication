import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const user = auth().currentUser;

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Text>Email: {user?.email}</Text>
            <TouchableOpacity
                onPress={handleLogOut}
                className=" bg-sky-500 w-3/5 p-3 rounded-lg mt-10"
            >
                <Text className=" text-white font-bold text-base text-center">
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;
