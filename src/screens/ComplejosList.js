import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Carousel from '../components/listasUsuarios/CarouselDraw'
import LinearGradient from 'react-native-linear-gradient'
import List from '../components/listasUsuarios/List'
import Cargando from '../components/Cargando'
import { listComplejosStyles } from '../styles/General'
import firebase from '../utils/firebase'
import 'firebase/firestore'


const db = firebase.firestore(firebase)


export default function ComplejosList(props) {
    const {navigation} = props
    const [reloadData, setReloadData] = useState(false)
    const [complejos, setComplejos] = useState([]);
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        setComplejos([]);
        db.collection("complejos")
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                    setLoading(false)
                })

                setComplejos(itemsArray);
            });

        setReloadData(false)
    }, [reloadData])
    return (
        <>
        <LinearGradient colors={['#fff', '#0a414e']}>
        <View style={{height:"100%"}}>
        {loading ?
            <Cargando/> 
            :
            <View style={[listComplejosStyles.container]}>
                <View style={[listComplejosStyles.container2]}>

                    <Carousel
                        complejos={complejos}
                    />
                </View>
                <View style={[listComplejosStyles.container3]}>
                <ScrollView>
                    {complejos.map((item, index) => (
                        <List
                            key={index}
                            complejos={item}
                           navigation={navigation}

                        />
                    ))}

                </ScrollView>
                </View>
            </View>
        }
        </View>
</LinearGradient>
           
        </>
    )
}
