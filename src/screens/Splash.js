import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { splashStyles} from '../styles/General'
import LinearGradient from 'react-native-linear-gradient'

export default class Splash extends Component{

    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }
    componentDidMount(){

        setTimeout(() =>{
            this.goToScreen('Perfil')
        }, 3500, this)

    }
    render(){ 
        return(   
            <View style={splashStyles.image}>
            <LinearGradient style={{height: "100%"}} colors={['#0a414e', '#fff', '#0a414e']}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
            <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 350,
                    height: 350,
                    margin: 175,
                }}
                source={require('../images/logo.png')}
            />
            </LinearGradient>
        </View>
        )
    }
}