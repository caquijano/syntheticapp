import React from 'react'
import { View, StatusBar, Text, Image, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { splashStyles} from '../styles/General'
import LinearGradient from 'react-native-linear-gradient'

const widthScreen = Dimensions.get("window").width;

export default function Offline() {
    return (
        
        <View style={splashStyles.image}>
        <LinearGradient colors={[ '#0a414e', '#fff','#fff', '#0a414e']}>
        <View style={{height:"100%", width:widthScreen, paddingHorizontal: "0%", paddingVertical: "50%"}}>
            <Animatable.Image
             animation='bounce'
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 318,
                    height: 250,
                    margin: 20,
                }}
                source={require('../images/opps.png')}
            />
            <Text style={{fontSize:25}}>Oops.. han ocurrido problemas</Text>
            <Text style={{fontSize:18}}>Revisa tu conexión a internet...</Text>
            </View>
            </LinearGradient>
        </View>
    )
}
