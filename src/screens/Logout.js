import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import firebasef from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const db = firebasef.firestore(firebasef)

export default function Logout() {
const [nada, setNada] = useState(false)
    useEffect(() => {
        firebasef.auth().signOut()
    }, [nada])
    return (
        <View>
            <Text>Gracias por prefrerirnos</Text>
            <Text>Vuelve pronto</Text>
        </View>
    )
}
