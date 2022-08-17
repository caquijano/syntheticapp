import React, { useState } from 'react';
import { View,  Image } from 'react-native';
import { authStyles } from '../styles/General';
import LoginForm from "./Login"


export default function Auth() {
    return(
    <View style={{
        justifyContent:"center",
        alignItems:"center",
        alignContent: "center"
    }}>
        <Image
            style={[authStyles.imagen]}
            source={require('../images/logo.png')}
        />
        <LoginForm/> 
    </View>
    )
}