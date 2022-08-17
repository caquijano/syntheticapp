import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { reservasStyles } from '../../styles/General'
import * as RootNavigation from '../RootNavigation'
import moment from 'moment';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";

const db = firebase.firestore(firebase)

export default function DrawHorarios(props) {
    const { contador, canchas, complejos, formData, setFormData, reload, setReload } = props
    const {dateBirth} = formData
    const [users, setUsers] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const [reloadId, setReloadId] = useState(false);
    
  
    useEffect(() => {
      setUsers({});
      db.collection("users")
          .where("UserId","==", firebase.auth().currentUser.uid )
          .get()
          .then((response) => {
              const itemsArray = [];
              response.forEach((doc) => {
                  const data = doc.data();
                  data.id = doc.id;
                  itemsArray.push(data);
              })
              setUsers(itemsArray[0]);
          });
  }, [])
  

    return (
        <View style={[reservasStyles.container2]}>
            {contador.map((item, index) => (
                <View key={index}>

                    {item ?
                        <TouchableOpacity
                            style={[reservasStyles.card]}
                        >
                            <View style={[reservasStyles.reservado]}>
                                <Text style={[reservasStyles.textreservado]}> La cancha entre {index + complejos.Apertura}:00-{index + complejos.Apertura}:59 se encuentra reservada </Text>
                            </View>
                        </TouchableOpacity>
                        :
                        
                        <TouchableOpacity
                            onPress={()=> RootNavigation.navigate('Stripe', {canchas, users, complejos, index, dateBirth, reload, setReload}) }
                            style={[reservasStyles.card]}
                        >
                            <View style={[reservasStyles.noreservado]}>
                                <Text style={[reservasStyles.textnoreservado]}>Reservar cancha entre {index + complejos.Apertura}:00-{index + complejos.Apertura }:59</Text>
                            </View>
                        </TouchableOpacity>
                    }

                </View>
            ))
            }

        </View>
    )
}
