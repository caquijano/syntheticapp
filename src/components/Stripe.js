import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Separator,
  Image,
  Thumbnail,
  Left,
  Body,
  Right,
} from 'native-base';
import { StripeProvider } from '@stripe/stripe-react-native'
import Button from '../components/pagos/Button';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import * as RootNavigation from '../components/RootNavigation';

const db = firebase.firestore(firebase);


export default function Stripe(props) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const {canchas, users, complejos, index, dateBirth, reload, setReload, navigation} = props.route.params;
  const {Techada} = canchas;
 

console.log(props)
  const handleCardPayPress = async () => {
    try {
      setLoading(true);
      setToken(null);
      const token1 = await StripeProvider.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: users.Nombre,
            line1: 'Canary Place',
            line2: '3',
            city: users.Residencia,
            state: 'Georgia',
            country: 'COL',
            postalCode: '252211',
            email: users.Email,
          },
        },
      });

      setLoading(false);
      setToken(token1);
    } catch (error) {
      setLoading(false);
    }
  };

  const AddReserva = () => {

   db.collection("reservas")
        .add({
            Cancelado: 'Si',
            Fecha: dateBirth,
            Hora: index+8,
            UsuarioId: firebase.auth().currentUser.uid,
            CanchasId: canchas.id,
            createAt: new Date(),
        })
        .then(() => {
            setReload(!reload)
            Alert.alert("Reserva realizada con exito!!!") 
        })
        .catch(() => {
            Alert.alert("Upps ocurrieron problemas")
        });
}

  const makePayment = async () => {
    setLoading(true);

    axios({
      method: 'POST',
      url:
        'https://us-central1-synthetic-app.cloudfunctions.net/completePaymentWithStripe',
      data: {
        amount: canchas.Precio*100,
        currency: 'cop',
        token: token,
      },
    }).then((response) => {
      console.log(response);
      setLoading(false);
      AddReserva()
      RootNavigation.navigate("Reservas")


    });
  };

  return (
    <>
      <Container>
        <Content>
          <Separator bordered>
            <Text>Datos de la cancha...</Text>
          </Separator>
          <ListItem >
              <Thumbnail
                style={{width: 70, height: 70}}
                square
                source={{uri: canchas.Image[0]}}
              />
            <Body style={{margin: 20}}>
            <Text>{complejos.Nombre}</Text>
              <Text>{canchas.Tamaño}</Text>
              {Techada == 'Si' ? (
                <Text>Techada</Text>
              ) : (
                <></>
              )}
              <Text>Cesped {canchas.Tipo}</Text>
              <Text>Hora {index+ complejos.Apertura}:00 - {index+complejos.Apertura}:59</Text>
            </Body>
            <Right>
              <Text style={{fontSize: 20, width: '150%'}}>
                ${canchas.Precio}
              </Text>
            </Right>
          </ListItem>
          <Separator bordered>
            <Text>Tus datos...</Text>
          </Separator>
          
          <ListItem>
          <Thumbnail
                style={{width: 70, height: 70, borderRadius: 20}}
                square
                source={{uri: users.Foto}}
              />
          <Body style={{margin: 20}}>
            <Text>Nombre:         {users.Nombre}</Text>
            <Text>Email:             {users.Email}</Text>
            <Text>Telefono:        {users.Telefono}</Text>
            <Text>Residencia:    {users.Residencia}</Text>
            </Body>
          </ListItem>
          <Separator bordered>
            <Text>Realizar pago...</Text>
          </Separator>
          <ListItem style={{height: 180, margin: 0}}>
          <View style={styles.container}>
            <Text style={styles.header}>Total a pagar: ${canchas.Precio}</Text>
            
           
            <View style={styles.token}>
              {!token ? (
                <>
                <Text style={styles.instruction}>
              Click en el boton para desplegar el formulario.
            </Text>
                <TouchableOpacity
                style={{
                  backgroundColor: "#0a414e",
                  height: 40,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  marginLeft: "15%"
                }}
              loading={loading}
              onPress={handleCardPayPress}
            >
            <Text style={{color: "#fff", fontSize: 18}}>Pagar con tarjeta</Text>
            </TouchableOpacity>
                </>
              ):
              (
                <>
                  <Text style={styles.instruction}>Token: {token.tokenId}</Text>
                  <Button
                    text="Confirmar pago"
                    loading={loading}
                    onPress={makePayment}
                  />
                </>
              )
              }
            </View>
          </View>
          </ListItem>
        </Content>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
