import React from 'react'
import { View, Text } from 'react-native'

export default function Horarios(props) {
    const {canchas, reserva, contador, complejos} = props
    const {Hora} = reserva;
    var cont = Hora-complejos.Apertura
    contador[cont] = true
    
    return (
        <>
        </>
    )
}
