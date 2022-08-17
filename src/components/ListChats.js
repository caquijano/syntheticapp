import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { ListItem, Avatar, Icon } from '@rneui/themed'
import ListChats2 from '../components/ListChat2'
import firebaseF from '../utils/firebase'
import 'firebase/compat/database'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";
import { map, toArray } from 'lodash';
import * as RootNavigation from '../components/RootNavigation'

const db = firebase.firestore(firebase)

export default function ListChats(props) {
  const { idChat, message } = props
  const [lista, setLista] = useState([])
  const [array, setArray] = useState([])
  const [item1, setItem1] = useState([])
  const [item, setItem] = useState([])

  useEffect(() => {

    const chats = firebaseF.database().ref(idChat);
    chats.on('value', (snapshot) => {
      setLista(toArray(snapshot.val()));
    });
  }, []);

  useEffect(() => {
    setItem([]);
    db.collection("users")
      .where('UserId', '==', firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        })
        setItem(itemsArray);
      });
  }, [])

  useEffect(() => {
    setItem1([]);
    db.collection("users")
      .where('UserId', '==', array)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        })
        setItem1(itemsArray);
      });
  }, [array])


  return (
    <View>
      {map(lista, (items, index) => (
        <ListChats2 item={items} index={index} setArray={setArray} array={array} user1={item1} />
      ))}


      <>
        {item1.map((user1, index1) => (
          <>
            {item.map((user, index) => (
              <View>
                <ListItem  bottomDivider containerStyle={{ backgroundColor: "rgba(255,255,255,0.6)", margin: 10 }} onPress={() => RootNavigation.navigate('Chat', { user, user1 })} >
                  <Avatar source={{ uri: user1.Foto }} />
                  <ListItem.Content>
                    <ListItem.Title>{user1.Nombre}</ListItem.Title>
                    <ListItem.Subtitle numberOfLines={1}>{user1.Email}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    name='chat'
                    type='entypo'
                    color='#000'

                  />
                </ListItem>
              </View>
            ))}
          </>
        ))}
      </>
    </View>

  )
}
