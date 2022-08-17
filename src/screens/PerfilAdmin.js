import React, {useState, useEffect} from 'react'
import { View, Text, Image, ImageBackground, Dimensions} from 'react-native'
import FormDatos from '../components/perfil/FormDatos'
import ListDatos from '../components/perfil/ListDatos'
import {perfilStyles} from "../styles/General"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";



const db = firebase.firestore(firebase)
const widthScreen = Dimensions.get("window").width;

    
export default function PerfilAdmin(props) {
    const {navigation} = props
    const [users, setUsers] = useState({})
    const [reloadData, setReloadData] = useState(false)
    const [reloadId, setReloadId] = useState(false)
    
    useEffect(() => {
        setUsers([]);
        db.collection("users")
            .where("UserId","==", firebase.auth().currentUser.uid )
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                    setReloadId(true)
                })
                setUsers(itemsArray[0]);
            });
            
        setReloadData(false)
    }, [reloadData])
    return (
        
        <View style={perfilStyles.container}>
        
        <View style={perfilStyles.containerPh}>
        <ImageBackground
        source={require('../images/banner.jpg')}
        style={{ width: undefined, }}
      >
          <Text style={{width:widthScreen, height: "100%"}}></Text>
      </ImageBackground>
        </View>
        
        <View style={perfilStyles.containerPh1}>
        
        <Image style={perfilStyles.photo} source={{ uri: users.Image }}/>
        </View>
        
        <View style={perfilStyles.containerInf}>
        
            <Text style={perfilStyles.name}>{users.Nombre}</Text>
            <Text style={perfilStyles.email}>{firebase.auth().currentUser.email}</Text>

            
            {reloadId ? 
            <View>
                {/*users.map((item, index) => (
            <ListDatos
                key={index}
                users={item}
            /> 
                ))*/}
            </View>
            
            :
            <FormDatos setReloadData={setReloadData} setReloadId={setReloadId} navigation={navigation}/> }
            
        </View>
        </View>
    )
}

//