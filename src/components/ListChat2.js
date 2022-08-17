import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import firebaseF from '../utils/firebase'
import 'firebase/compat/database'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";
import { map } from 'lodash';

const db = firebase.firestore(firebase)

export default function ListChats(props) {
    const {item, index, setArray, array, user1} = props
    const [list, setList] = useState([])

    if (index == 0) {
        if (item.UserId  == firebase.auth().currentUser.uid || item.FUserId  == firebase.auth().currentUser.uid ) {
            if (item.UserId  == firebase.auth().currentUser.uid ) {
                setArray(item.FUserId)
            } else {
                if (item.FUserId  == firebase.auth().currentUser.uid ) {
                    setArray(item.UserId)
                }
            }
        }
        
    } 
    return (
        <View>
        </View>
    )
}
