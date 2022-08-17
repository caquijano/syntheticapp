import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, View } from 'react-native';
import { authStyles } from '../styles/General';
import { validateEmail } from '../components/validation'
import firebase from '../utils/firebase'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { auth } from 'firebase/compat';

export default function Registro(props) {
    

    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const provider = auth.GoogleAuthProvider;
    



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

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '71616933650-mlbf8au5gl3euiudirh75um8e0khbm1j.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            //hostedDomain: '', // specifies a hosted domain restriction
            //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            //accountName: '', // [Android] specifies an account name on the device that should be used
            //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn} />

            <View style={[authStyles.btnLogin]}>
                <TouchableOpacity style={[authStyles.button1]} >
                    <Text style={{ color: '#fff', fontSize: 17 }}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

function defaultValue() {
    return {
        email: '',
        password: '',
        repeatPassword: '',
    }

}