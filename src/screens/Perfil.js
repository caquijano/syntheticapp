import React, {useState, useEffect} from 'react'
import { View, Text, Image, ImageBackground, Dimensions, ScrollView} from 'react-native'
import FormDatos from '../components/perfil/FormDatos'
import ListDatos from '../components/perfil/ListDatos'
import {perfilStyles} from "../styles/General"
import firebasef from 'firebase/compat/app';
import 'firebase/compat/storage';


const db = firebasef.firestore(firebasef)
const widthScreen = Dimensions.get("window").width;

    
export default function Perfil(props) {
    const {navigation} = props
    const [users, setUsers] = useState({})
    const [reloadData, setReloadData] = useState(false)
    const [reloadId, setReloadId] = useState(false)
    
    useEffect(() => {
        setUsers([]);
        db.collection("users")
            .where("UserId","==", firebasef.auth().currentUser.uid )
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                    setReloadId(true)
                })
                setUsers(itemsArray);
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
        
        <Image style={perfilStyles.photo} source={{ uri: (firebasef.auth().currentUser.photoURL) }}/>
        </View>
        <ScrollView>
        <View style={perfilStyles.containerInf}>
        
            <Text style={perfilStyles.name}>{firebasef.auth().currentUser.displayName}</Text>
            <Text style={perfilStyles.email}>{firebasef.auth().currentUser.email}</Text>
            {reloadId ? 
            <View>
                {users.map((item, index) => (
            <ListDatos
                key={index}
                users={item}
            /> 
                ))}
            </View>
            
            :
            <FormDatos setReloadData={setReloadData} setReloadId={setReloadId} navigation={navigation}/> }
            
        </View>
        </ScrollView>
        </View>
    )
}

//