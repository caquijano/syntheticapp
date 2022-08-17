import React from 'react'
import color from './Colors'
import { StyleSheet, Dimensions } from 'react-native'
import { registerVersion } from 'firebase'

const {width} = Dimensions.get('window');

//Estilos para MainScreen
const mainStyles = StyleSheet.create({

    container: {
        backgroundColor: color.SECONDARYCOLOR,
        flex: 1,
        justifyContent: "center"
    },
})
//Estilos para SplashScreen
const splashStyles = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.WHITE,
    }
})
const ComplejosStyles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: "center",
        flex: 1,

    },
    container2: {
        flexDirection: "row",
    },
    containerbtn: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 65,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 2.5,
    },

    input: {
        height: 50,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputimg: {
        height: 50,
        color: color.BLACK,
        width: "59%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 0,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputBig: {
        height: 70,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputSelect: {
        flexDirection: "row",
        alignContent: "space-between",
        height: 50,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    scroll: {
        marginBottom: 50,
        width: "100%",
        alignContent: "center"
    },
    button: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00796b",
        height: 50
    },
    buttonSave: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 50,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 1.5,
        margin: 10
    },
    textbtn: {
        fontSize: 17
    },
})
const CanchasStyles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: "center",
        flex: 1,
    },
    container2: {
        flexDirection: "row",
    },
    containerx: {
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: "10%",
        borderColor: color.GREEN
    },
    containerbtn: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 65,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 2.5,
    },

    input: {
        height: 50,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputC: {
        color: '#000',
        width: "80%",
        backgroundColor: '#fff',
        borderColor: '#000',
        fontSize: 16,
        borderRadius: 30,
        paddingLeft: 15
    },
    inputimg: {
        height: 50,
        color: color.BLACK,
        width: "70%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 0,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },
    inputBig: {
        height: 70,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    scroll: {
        marginBottom: 50,
        width: "100%",
        alignContent: "center"
    },
    button: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00796b",
        height: 50
    },
    buttonSave: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 50,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 1.5,
        margin: 10
    },
    textbtn: {
        fontSize: 17
    },
})

const principalStyles = StyleSheet.create({

    btnLogOut: {
        marginTop: 50,
        height: 40,
        width: 150,
        borderRadius: 9,
        alignItems: "center",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: 50,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        marginBottom: 30
    },
    container: {
        alignItems: "center",
        height: "100%",
        justifyContent: "center"
    },
    logout: {
        backgroundColor: color.RED,
        borderRadius: 50,
        paddingHorizontal: "15%",
        paddingVertical: 30,
        justifyContent: "center"
    },
    newB: {
        backgroundColor: color.GREEN,
        borderRadius: 50,
        paddingHorizontal: "15%",
        paddingVertical: 30,
        justifyContent: "center"
    },
    textB1: {
        fontSize: 16,
        color: color.WHITE,
        textAlign: "center",
    },
    textB2: {
        fontSize: 16,
        color: color.BLACK,
        textAlign: "center",
    },
    input: {
        height: 50,
        color: color.WHITE,
        width: 350,
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
        justifyContent: "center",

    },
    pickers: {
        color: color.WHITE,
        fontSize: 18,

    },
    picker: {
        color: "#b6bbc2",
        fontSize: 18,

    },
    touch: {

        marginTop: 50,
        height: 50,
        width: 200,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: "center",
        borderColor: color.WHITE,
        justifyContent: "center",
    },
    button1: {

        fontSize: 19,
        color: color.WHITE,

    },
    error: {
        borderColor: color.RED,
        borderWidth: 1.5,
    }
})

const chatStyles = StyleSheet.create({

    content: {

        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        backgroundColor: color.PRIMARYCOLOR,
        paddingBottom: 20,
        paddingHorizontal: 30,
    },
    chatText: {
        color: color.WHITE,
    },
    iconsend: {
        color: color.WHITE
    },
    header: {
        backgroundColor: color.PRIMARYCOLOR,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        color: "#e8ebe9",
        height: 80
    },
    header2: {
        backgroundColor: color.PRIMARYCOLOR,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        color: "#e8ebe9",
        height: 80,
    },
    header3: {
        backgroundColor: color.PRIMARYCOLOR,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        color: "#e8ebe9",
        height: 60,
        paddingTop: 20
    },
    chatView: {
        
    }


})
const messageStyles = StyleSheet.create({

    container: {
        flexDirection: "row",
        margin: 5,
        alignItems: "center",
        
    },
    viewMessage: {
        
        minHeight: 35,
        minWidth: "40%",
        maxWidth: "80%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: color.WHITE,
        
        
    },
    message: {
        padding: 5,
        paddingBottom: 25,
        
    },
    time: {
        fontSize: 10,
        position: "absolute",
        bottom: 5,
    },
    timeRight:{
        right: 8,
        color : '#fff'
    },
    timeLeft:{
        left: 8,
        color : 'grey'
    },
    letterView:{
        height: 35,
        width: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center" ,
        marginRight: 10,
        backgroundColor: "#7c10e0"
    },
    letter:{
        fontSize: 20,
        color: '#fff'
    },
    
})


const authStyles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: color.WHITE,
    },
    imagen: {
        width: 250,
        height: 250,
        marginEnd: 20,
        marginBottom: 50,
    },
    button: {
        marginTop: 50,
        backgroundColor: "#00796b",
        height: 60,
        width: 180,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center"
    },
    button1: {

        marginTop: 50,
        height: 40,
        width: 150,
        borderRadius: 9,
        alignItems: "center",

    },
    input: {
        height: 50,
        color: color.WHITE,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040"
    },
    btnLogin: {

        justifyContent: "flex-end"
    },
    error: {
        borderColor: color.RED,
        borderWidth: 1.5,
    }
})
const DrawerStyles = StyleSheet.create({
    container: {


    },
    aja: {
        flexDirection: "row",
        justifyContent: "flex-end"

    },

    bgContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#A0A0A0'
    },

    userContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    userImagen: {
        width: 70,
        height: 70,
        borderRadius: 35
    },

    camaraContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    camaraIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 15,
        bottom: 3,
    },

    userNombre: {
        marginVertical: 10,
        fontFamily: "Poppins-Light",
        color: color.WHITE
    },

    userTitulo: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: "Poppins-Light",
        color: color.WHITE
    },
    userEmail: {
        textAlign: 'center',
        fontSize: 13,
        color: color.GRAY,
        paddingVertical: 5,
        fontFamily: "Poppins-Light",
    },

    userSubTitulo: {
        textAlign: 'center',
        fontSize: 13,
        color: '#000',
        paddingVertical: 5,
        fontFamily: "Poppins-Light",
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginVertical: 15,
    },
    list: {
        flexDirection: 'column-reverse',
        justifyContent: "space-between",
    },

    iconoContainer: {
        flex: 1.5,
        justifyContent: 'center'
    },

    tituloContainer: {
        flex: 8.5,
        justifyContent: 'center'
    },

    tituloTxt: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        borderRadius: 60

    },
    difuminado: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    fondoImagen: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }

})
const modalStyles = StyleSheet.create({

    map: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d",
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680",
    },
})
const listComplejosStyles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: "center",
        
    },
    container2: {

        flex: 5,
        justifyContent: "center",
        
    },
    container3: {

        flex: 5,
        justifyContent: "center",
        
    },
    slide: {
        width: 50,
        backgroundColor: color.WHITE
    },
    title: {
        fontSize: 25,
        color: color.GRAY
    },
    Imagen: {
        marginTop: 30,
        width: '100%',
        height: "80%",
        borderRadius: 20,
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    card: {

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    leftbtn: {
        color: color.RED,
        fontSize: 60
    },
    plusbtn: {
        color: color.PRIMARYCOLOR,
        fontSize: 60
    },
    footer: {

        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "85%",
        flex: 1,
    },
    containerlist: {
        flex: 9
    },
    content: {
        flex: 1,
        flexDirection: "column"
    }
})

const perfilStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerPh: {
        flex: 4,
        alignItems: "center",
    },
    containerPh1: {
        height: 45,
        alignItems: "center",
        
    },
    containerInf:  {
        flex: 8,
        alignItems: "center",
        width: "100%"
        
        
    },
    containerList: {
        backgroundColor: color.GRAY,
        width: 400,
        padding: "3%",
        marginTop: 40,
        borderRadius: 30
    },
    containerbtn: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 65,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 2.5,
    },
    txtList:{
        fontWeight: "bold",
        fontSize: 19,
        margin: 12
    }, 
    photo: {
        height: 200,
        width: 200,
        borderRadius: 125,
        borderWidth: 5,
        borderColor: color.WHITE,
        marginTop: -100,

    },
    name: {
        fontSize: 35,
        paddingTop: "14%"
    },
    email:{
        fontSize: 18
    },
    input: {
        height: 50,
        color: color.BLACK,
        width: "100%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputimg: {
        height: 50,
        color: color.BLACK,
        width: "59%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 0,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    inputBig: {
        height: 150,
        color: color.BLACK,
        width: "100%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    buttonSave: {
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.WHITE,
        color: "#00796b",
        height: 50,
        borderRadius: 50,
        borderColor: "#00796b",
        borderWidth: 1.5,
        margin: 10
    },
    textbtn: {
        fontSize: 17
    },
    btnMessage: {
        backgroundColor: color.PRIMARYCOLOR,
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    textbtnMessage:{
        color: color.WHITE,
        fontSize: 17,
    },
    iconbtnMessage:{
        color: color.WHITE,
        fontSize: 23,
    },
    scroll: {
        marginBottom: 50,
        width: "75%",
        alignContent: "center"
    },
    pickers: {
        color: color.BLACK,
        fontSize: 18,

    },
    picker: {
        color: "#b6bbc2",
        fontSize: 18,

    },
})
const reservasStyles = StyleSheet.create({
    scroll: {
        marginBottom: 50,
        width: "100%",
        paddingHorizontal: "10%",
        flex: 1
       
    },
    card: {
        justifyContent: "center",
        height: 60,
        width: width,
        alignItems: "center",
        alignContent: "center",
        borderRadius: 15
    },
    reservado: {
        borderWidth: 2,
        borderColor: "#8f8f8f",
        borderRadius:15,
        height: 50,
        color: "#8f8f8f",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

    },
    noreservado: {
        backgroundColor: "#00796b",
        borderRadius:15,
        height: 50,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    noreservado2: {
        backgroundColor: "#00796b",
        borderRadius:15,
        height: 50,
        width: 350,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    textreservado: {
        fontSize: 15,
    },
    textnoreservado: {
        fontSize: 18,
    },
    container:{
        flex: 1,
        marginTop: 21,
        alignItems: "center",
        width: "100%",
        
    },
    container2:{
        flex: 5,
        marginTop: 21,
        alignItems: "center",
        width: "100%",
        
    },
    container2:{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        
    },
    input: {
        height: 50,
        color: color.BLACK,
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#00796b"
    },
    pickers: {
        color: color.BLACK,
        fontSize: 18,

    },
    picker: {
        color: "#b6bbc2",
        fontSize: 18,

    },
})


export { mainStyles, reservasStyles, messageStyles ,chatStyles, splashStyles, perfilStyles, authStyles, principalStyles, DrawerStyles, ComplejosStyles, CanchasStyles, modalStyles, listComplejosStyles };

