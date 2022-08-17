import React from 'react'
import { View, Text } from 'react-native'
import {perfilStyles} from "../../styles/General"
import moment from 'moment';

export default function ListDatos(props) {
    const {users} = props
    const { FechaNto ,Pierna, Posicion, Residencia, Telefono} = users
    const date = new Date(FechaNto.seconds*1000);
    const dateBirth = moment(date).format("ll");
    
    return (
        <View style={[perfilStyles.containerList]}>
            <Text style={perfilStyles.txtList}>Fecha Nacimiento: {dateBirth} </Text>
            <Text style={perfilStyles.txtList}>Ciudad de Residencia: {Residencia} </Text>
            <Text style={perfilStyles.txtList}>Posicion de Preferencia: {Posicion} </Text>
            <Text style={perfilStyles.txtList}>Pierna Habil: {Pierna} </Text>
            <Text style={perfilStyles.txtList}>Numero de Contacto: {Telefono} </Text>
        </View>
    )
}
