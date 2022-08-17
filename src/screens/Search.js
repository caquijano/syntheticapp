import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import LinearGradient from 'react-native-linear-gradient'
//import "firebase/compat/firestore";
import ListSearch from '../components/search/ListSearch'
import { perfilStyles } from '../../src/styles/General'

const db = firebase.firestore(firebase)

export default function Search() {
    const [user1, setUser1] = useState({})
    const [reloadData, setReloadData] = useState(false)
    const [reloadId, setReloadId] = useState(false)
    const [name, setName] = useState({
        Nombre:''
    })

    useEffect(() => {
        setUser1([]);
        db.collection("users")
        .orderBy('Nombre').startAt(name.Nombre).endAt(name.Nombre+'\uf8ff')           
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                    setReloadId(true)
                })
                setUser1(itemsArray);
            });

        setReloadData(false)
    }, [name.Nombre])
    return (
        <>
        <LinearGradient style={{height:"100%"}} colors={['#fff', '#0a414e']}>
        <TextInput 
             style={[perfilStyles.input]}
             placeholder="Buscar Usuario ..."
             onChange={(e) => setName({ ...name, Nombre: e.nativeEvent.text })}
             
        />
            {name.Nombre ?
                <>
                    {user1.map((item, index) => (
                        <ListSearch
                            key={index}
                            user1={item}
                        />
                    ))}
                </>
                :

                <View>
                    <Text>No se encuentran resultados para su busqueda...</Text>
                </View>
            }
            </LinearGradient>
        </>
    )
}
