import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { authStyles } from '../styles/General';
import { validateEmail } from '../components/validation'
import firebase from '../utils/firebase'
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
export default function Usuarios(props) {

    return(
        <View >
   </View>
  )

    /*const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    
    const Register = () => {
        let errors = {};
        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
            if (!formData.repeatPassword) errors.repeatPassword = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            errors.repeatPassword = true;
            errors.password = true;
        } else if (formData.password.length < 6) {
            errors.repeatPassword = true;
            errors.password = true;
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("cuenta creada")
                }).catch(() => {
                    setFormError({
                        email: true,
                        repeatPassword: true,
                        password: true,
                    })
                })
        }
        setFormError(errors);
    }

    return (
        <>
            <TextInput
                style={[authStyles.input, formError.email && authStyles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#b6bbc2"
                onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
            />
            <TextInput
                style={[authStyles.input, formError.password && authStyles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#b6bbc2"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}
            />
            <TextInput
                style={[authStyles.input, formError.repeatPassword && authStyles.error]}
                placeholder="Repetir Contraseña"
                placeholderTextColor="#b6bbc2"
                secureTextEntry={true}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.nativeEvent.text })}
            />
            <TouchableOpacity onPress={Register}>
                <Text>
                Registrar
                </Text>
            </TouchableOpacity>
        </>
    )
}

function defaultValue() {
    return {
        email: '',
        password: '',
        repeatPassword: '',
    }*/

}
