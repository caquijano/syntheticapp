import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, Body, Icon, Button} from 'native-base';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const db = firebase.firestore(firebase);

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);
  const [reloadData, setReloadData] = useState(true);
  useEffect(() => {
    setReservas([]);
    db.collection('reservas')
      .where('UsuarioId', '==', firebase.auth().currentUser.uid)
      .orderBy('Fecha', 'asc')
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        setReservas(itemsArray);
      });

    setReloadData(false);
  }, [reloadData]);
  console.log(reservas);
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#999'}}></Text>
        <Text style={{color: '#999'}}>
          ---------------------- Próximas reservas ----------------------
        </Text>
        <Text style={{color: '#999'}}></Text>
      </View>
      {reservas.map((item) => (
        <Reserva item={item} />
      ))}
      <View
        style={{
          alignContent: 'center',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
        onPress={setReloadData}
          style={{
            padding: 15,
            alignItems: 'center',
          }}>
          <Icon type="MaterialIcons" name="update" />
          <Text>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export function Reserva(props) {
  const {item} = props;
  const [boolean, setBoolean] = useState(false);
  const [reloadData, setReloadData] = useState(true);
  const [canchas, setCanchas] = useState([]);
  const FechaR = item.Fecha;
  const date = new Date(FechaR.seconds * 1000);
  const fechaReserva = moment(date).format('ll');
  const timestamp = new Date().getTime() - 86400000;
  const hora = new Date(FechaR.seconds * 1000).getTime();

  useEffect(() => {
    if (hora <= timestamp) {
      setBoolean(false);
    } else {
      setBoolean(true);
    }
  }, [boolean]);

  useEffect(() => {
      setCanchas([]);
      db.collection("canchas")
          .where("canchas_ID","==",item.CanchasId)
          .get()
          .then((response) => {
              const itemsArray = [];
              response.forEach((doc) => {
                  const data = doc.data();
                  data.id = doc.id;
                  itemsArray.push(data);
                  
              })
              setCanchas(itemsArray[0]);
          });
          
      setReloadData(false)
  }, [reloadData])
  console.log(canchas)
  return (
    <>
      {boolean ? (
        <>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  {fechaReserva}  {item.Hora}:00-{item.Hora}:59
                </Text>
              </Body>
            </CardItem>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
