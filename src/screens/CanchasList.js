import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore'
import ListCanchas from '../components/listasUsuarios/ListCanchas';


const db = firebase.firestore(firebase)

export default function CanchasList(props) {
    const { navigation } = props
    const { complejos } = props.route.params
    const { id, Nombre, Descripcion } = complejos
    const [reloadData, setReloadData] = useState(false)
    const [canchas, setCanchas] = useState([]);


    useEffect(() => {
        setCanchas([]);
        db.collection("canchas")
            .where("ComplejosId", "==", id)
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                })
                setCanchas(itemsArray);
            });

        setReloadData(false)
    }, [reloadData])



    return (
        <>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 25, }}>{Nombre}</Text>
            </View>
            <ScrollView>
                {canchas.map((item, index) => (
                    <ListCanchas
                        key={index}
                        canchas={item}
                        navigation={navigation}
                        complejos={complejos}
                    />
                ))}
            </ScrollView>
        </>


    );
}