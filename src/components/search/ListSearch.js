import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ListItem, Avatar, Icon } from '@rneui/themed'
import * as RootNavigation from '../RootNavigation'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";


const db = firebase.firestore(firebase)

export default function ListSearch(props) {
  const { user1 } = props
  const [user, setUser] = useState({})


  useEffect(() => {
    setUser({});
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
        setUser(itemsArray[0]);
      });
  }, [])
  return (

    <ListItem bottomDivider containerStyle={{ backgroundColor: "rgba(255,255,255,0.3)", margin: 10 }} onPress={() => RootNavigation.navigate('UserInfo', {user,user1})} >
      <Avatar source={{ uri: user1.Foto }} />
      <ListItem.Content>
        <ListItem.Title>{user1.Nombre}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>{user1.Email}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name='magnifying-glass'
        type='entypo'
        color='#000'

      />
    </ListItem>
  )
}
