import React, { useEffect, useState, ActivityIndicator } from 'react';
import { Image, View } from 'react-native';
import {
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import { Card, Avatar, Icon, Text } from '@rneui/themed'
import Tab1 from '../components/DetalleAdmin/ReservaAdmin';
import Tab2 from '../components/DetalleAdmin/Reservas';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";



const db = firebase.firestore(firebase)
export default function DetalleCanchas(props) {
  const { canchas, complejos } = props.route.params;
  const [reservas, setReservas] = useState({})
  const [reloadData, setReloadData] = useState(false)

  useEffect(() => {
    setReservas([]);
    db.collection("reservas")
      .where("CanchasId", "==", canchas.id)
      .orderBy("Fecha", "asc")
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        })
        setReservas(itemsArray);
      });

    setReloadData(false)
  }, [reloadData])
  return (
    <>
      <View>
        <Card>
          <Avatar source={{ uri: canchas.Image[0] }} />
          <Text>{canchas.Tamaño}</Text>
          <Text note>Cesped {canchas.Tipo}</Text>
          <Text note>{canchas.Techada} es Techada</Text>
          <Card.Divider />

          <Card.Image
            source={{ uri: canchas.Image[0] }}
            PlaceholderContent={<ActivityIndicator />}
          />

          <Text>${canchas.Precio}</Text>
        </Card>


      </View>
    </>
  );
}
