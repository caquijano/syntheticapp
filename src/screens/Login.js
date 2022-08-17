import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput} from 'react-native';
import { authStyles } from '../styles/General';
import { validateEmail } from '../components/validation'
import firebase from '../utils/firebase'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { auth } from 'firebase/compat';



export default function Login(props) {
    const provider = auth.GoogleAuthProvider;

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '71616933650-mlbf8au5gl3euiudirh75um8e0khbm1j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        });
    }, [])

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            
            const authCredential = provider.credential(userInfo.idToken)
            firebase
                .auth()
                .signInWithCredential(authCredential)
                .then(() => {
                    console.log("cuenta creada")
                })
        } catch (error) {
            console.log({ error })
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("1")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("2")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("3")
            } else {
                console.log("other")
            }
        }
    };


    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const Login = () => {
        let errors = {};
        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        } else if (!validateEmail(formData.email)) {
            errors.email = true;
        } else if (formData.password.length < 6) {
            errors.password = true;
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("Usuario Logeado")
                }).catch(() => {
                    setFormError({
                        email: true,
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
            <TouchableOpacity style={[authStyles.button]} onPress={Login} >
                <Text style={{ color: '#fff', fontSize: 22 }}>Iniciar Sesion</Text>
            </TouchableOpacity>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn} />
        </>
    )
}
function defaultValue() {
    return {
        email: '',
        password: '',
    }

}
