import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import firebaseF from '../utils/firebase'
import ListChats from '../components/ListChats'
import 'firebase/database'
import LinearGradient from 'react-native-linear-gradient'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";
import { toArray, map } from 'lodash';

export default function Chats() {
    const [list, setList] = useState([])

    useEffect(() => {
       
        const chats = firebaseF.database().ref();
        chats.on('value', (snapshot) => {
            setList(snapshot.val());
        });
    }, []);
    
    return (
        <LinearGradient colors={['#fff', '#0a414e']}>
        <View style={{height: "100%"}}>
        {map(list, (message ,index) => (
            <ListChats idChat={index} message={message} />
                    ))}
            
        </View>
        </LinearGradient>
    )
}
