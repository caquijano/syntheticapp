import React, { useEffect, useState, ActivityIndicator } from 'react';
import { Image as Imagen, View, Dimensions } from 'react-native';
import { Card, Avatar, Icon, Text, Tab, TabView } from '@rneui/themed'
import Tab1 from '../components/DetalleAdmin/ReservaAdmin';
import Tab2 from '../components/DetalleAdmin/Reservas';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ListItem } from 'react-native-elements';
//import "firebase/compat/firestore";

const widthScreen = Dimensions.get('window').width;

const db = firebase.firestore(firebase)
export default function DetalleCanchas(props) {
  const { canchas, complejos } = props.route.params;
  const [reservas, setReservas] = useState({})
  const [reloadData, setReloadData] = useState(false)
  const [indicator, setIndicator] = useState(0)

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
      <View style={{ margin: 10, padding: 0 }} >
        <Card containerStyle={{ margin: 0, padding: 0 }} >

          <ListItem>
            <Avatar rounded size={70} source={{ uri: canchas.Image[0] }} />
            <View>
              <Text>{canchas.Tamaño}</Text>
              <Text note>Cesped {canchas.Tipo}</Text>
              <Text note>{canchas.Techada} es Techada</Text>
            </View>

          </ListItem>

          <Card.Divider />
          <Card.Image source={{ uri: canchas.Image[0] }} />
          <ListItem>
            <Text>{"                                                 "}</Text>
            <Text style={{ fontSize: 20 }}>${canchas.Precio}</Text>
          </ListItem>

        </Card>

        <Tab value={indicator} variant="primary" onChange={(e) => setIndicator(e)} scrollable containerStyle={{ backgroundColor: "#0a414e" }} indicatorStyle={{ width: "50%" }}>
          <Tab.Item
            containerStyle={(active) => ({
              backgroundColor: active ? "#032830" : undefined,
              width: (widthScreen / 2) - 10
            })}
          >
            Reservar
          </Tab.Item>
          <Tab.Item
            buttonStyle={(active) => ({
              backgroundColor: active ? "#032830" : undefined,
              width: (widthScreen / 2) - 10
            })}

          >
            Reservas
          </Tab.Item>
        </Tab>
        <TabView value={indicator} onChange={setIndicator}>
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <Tab1 complejos={complejos} canchas={canchas} setReloadData={setReloadData} reloadData={reloadData} />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <Tab2 complejos={complejos} canchas={canchas} reservas={reservas} setReservas={setReservas} />
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
}
