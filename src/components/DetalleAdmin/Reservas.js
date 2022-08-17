import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
//import "firebase/compat/firestore";



const db = firebase.firestore(firebase)

export default function Reservas(props) {
  const {reservas, setReservas} = props;
  console.log(reservas)
  return (
<>
    {
      reservas.map((item, index)=>(
        <Text style={{color:"white"}}>h</Text>
      ))
    }
  </>
  );
}

/*export function Reserva(props) {
    const {item} = props
    const [boolean, setBoolean] = useState(false)
    const [reloadData, setReloadData] = useState(true)
    const [users, setUsers] = useState({})
     const FechaR = item.Fecha
    const date = new Date(FechaR.seconds*1000);
    const fechaReserva = moment(date).format("ll");
    const timestamp = new Date().getTime()-86400000;
    const hora = new Date(FechaR.seconds*1000).getTime();

    useEffect(() => {
      if (hora <= timestamp) {
        setBoolean(false)
      } else {
        setBoolean(true)
      }
    }, [boolean])

    useEffect(() => {
      setUsers([]);
      db.collection("users")
          .where("UserId","==", item.UsuarioId )
          .get()
          .then((response) => {
              const itemsArray = [];
              response.forEach((doc) => {
                  const data = doc.data();
                  data.id = doc.id;
                  itemsArray.push(data);
                  
              })
              setUsers(itemsArray[0]);
          });
          
      setReloadData(false)
  }, [reloadData])
    return(
        <>
          {boolean ? 
          <Content>
            <Card>
              <CardItem>
                <Body>
                    <Text>{fechaReserva} hora:{item.Hora}</Text>
                    <Text
                    style={{
                      color: "#777"
                    }}
                    >Reservado por : {users.Nombre}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
          :
          <>
          </>
        }
        </>
    )
}*/