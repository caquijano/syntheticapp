import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, Title, Body } from 'native-base';
import { chatStyles } from '../styles/General'
import Input from '../components/chat/Input'
import LinearGradient from 'react-native-linear-gradient'
import firebasef from '../utils/firebase'
import 'firebase/compat/database'
import { map } from 'lodash'
import moment from 'moment';
import Message from '../components/chat/Message'
import firebase from "firebase/compat/app";
import { getDatabase, ref, get, child} from "firebase/database";
import "firebase/compat/storage";
//import "firebase/compat/firestore";



export default function Chat(props) {
    const { user, user1 } = props.route.params;
    const {Nombre, UserId} = user
    const FUserId = user1.UserId
    const key1 = user.createAt.seconds
    const key2 = user1.createAt.seconds
    const keyTable = key1+key2
   
    const [messages, setMessages] = useState([]);
    const chatScrollRef = useRef();
    
    
    useEffect(() => {

        const dbRef = ref(getDatabase());
        get(child(dbRef, keyTable)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }, []);

    const sendMessage = (message) => {
        const time = moment().format('hh:mm a')
        firebaseF.database().ref(keyTable).push({ Nombre, text: message, time, UserId, FUserId })
    }


    return (
        <>
           
           <Text style={{color:"#fff"}} >hello</Text>
        </>
    );
}
