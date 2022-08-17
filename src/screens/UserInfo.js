import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import {perfilStyles} from "../styles/General"
import { Icon } from '@rneui/themed'
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";
import * as RootNavigation from '../components/RootNavigation'


const db = firebase.firestore(firebase)

export default function UserInfo(props) {
    const {user, user1} = props.route.params
    console.log(user)
    const {FechaNto, createAt} = user1
    const date = -Math.ceil((FechaNto.seconds-createAt.seconds)/31536000)
    
   // const date2 = new Date(createAt.seconds*1000);
   // const dateBirth = moment(date).format("ll");
    return (
        <>
        <LinearGradient style={{height:"100%"}} colors={['#fff', '#0a414e']}>
        <ScrollView>
        <View style={{paddingTop:100}}>
        <View style={perfilStyles.container}>
        
        <View style={perfilStyles.containerPh}>
        
        <Image style={perfilStyles.photo} source={{ uri: user1.Foto }}/>
        </View>
        
        <View style={perfilStyles.containerInf}>
            <Text style={perfilStyles.name}>{user1.Nombre}</Text>
            <Text style={perfilStyles.email}>{user1.Email}</Text>
            <View>
                
                <View style={[perfilStyles.containerList]}>
                
                <TouchableOpacity style={[perfilStyles.btnMessage]} onPress={() => RootNavigation.navigate('Chat', {user,user1})} >
                <Icon style={[perfilStyles.iconbtnMessage]} type="FontAwesome5" name="inbox" />
                    <Text style={[perfilStyles.textbtnMessage]}> Iniciar conversacion</Text>
                    
                </TouchableOpacity>
            <Text style={perfilStyles.txtList}>Edad: {date} años </Text>
            <Text style={perfilStyles.txtList}>Ciudad de Residencia: {user1.Residencia} </Text>
            <Text style={perfilStyles.txtList}>Posicion de Preferencia: {user1.Posicion} </Text>
            <Text style={perfilStyles.txtList}>Pierna Habil: {user1.Pierna} </Text>
            <Text style={perfilStyles.txtList}>Numero de Contacto: {user1.Telefono} </Text>
        </View>
            </View>
            
        </View>
        </View>
        </View>
        </ScrollView>
        </LinearGradient>
        </>
    )
}
