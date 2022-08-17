import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Navigation from './Navigation';
import Navigationsu from './Navigationsu';
import Navigationadmin from './Navigationadmin';
import firebasef from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import Cargando from './Cargando';

const db = firebasef.firestore(firebasef);

export default function Rol(props) {
  const {user} = props;
  const [rol, setRol] = useState(true);
  const [rolAdmin, setRolAdmin] = useState(true);
  const [rolSu, setRolSu] = useState(true);
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem([]);
    db.collection('users')
      .where('UserId', '==', user.uid)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        setItem(itemsArray[0]);
        if (item.Rol == 'admin') {
          setRolAdmin(true);
        } else {
          setRolAdmin(false);
          if (item.Rol == 'user') {
            setRol(true);
          } else {
            setRol(false);
            if (item.Rol == 'root') {
              setRolSu(true);
            } else {
              setRolSu(false);
            }
          }
        }
        
      });
  }, [rol]);

  return (rolAdmin ? (
    <Navigationadmin user={user} />
  ) : rol ? (
    <Navigation user={user} />
  ) : rolSu ? (
    <Navigationsu user={user} />
  ) : (
    <Navigation user={user}/>
  ))

  /*if (item.Rol == 'admin') {
      return (  

            <Navigationadmin user={user}/>
    )
    }
     if (item.Rol == 'user') {
      return (   

            <Navigation user={user}/>
    )
    }
    if (item.Rol == 'SU') {
      return (  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
           <Navigation  user={user}/>
    )
    }*/
}
