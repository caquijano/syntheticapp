import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { messageStyles } from '../../styles/General'
import lettersColors from '../../utils/lettersColors'
export default function Message(props) {
    const {
        message: { Nombre, text, time },
        name,
    } = props;

    
    const [bgColorLetter, setBgColorLetter] = useState(null);
    const thisIsMe = name === Nombre;
    useEffect(() => {
        const char = Nombre.trim()[0].toUpperCase();
        const indexLetter = char.charCodeAt() - 65;
        setBgColorLetter(lettersColors[indexLetter])
    }, [])
    
    const conditionalStyle = {
        container: {
            justifyContent: thisIsMe ? 'flex-end' : 'flex-start'
        },
        viewMessage: {
            backgroundColor: thisIsMe ? '#f0f0f1' : '#4b86f0'
        },
        message: {
            color: thisIsMe ? '#000' : '#f0f0f1',
            textAlign: thisIsMe ? 'right' : 'left'
        }
    }

    return (
        <View style={[messageStyles.container, conditionalStyle.container]}>
            {!thisIsMe && (
                <View style={[messageStyles.letterView, { backgroundColor: `rgb(${bgColorLetter})` }]}>
                    <Text style={[messageStyles.letter]}>
                        {Nombre.substr(0, 1)}
                    </Text>
                </View>
            )}

            <View style={[messageStyles.viewMessage, conditionalStyle.viewMessage]}>
                <Text style={[messageStyles.message, conditionalStyle.message]}>{text} </Text>
                <Text style={[messageStyles.time, thisIsMe ? messageStyles.timeLeft : messageStyles.timeRight]}>{time} </Text>
            </View>
        </View>
    )
}