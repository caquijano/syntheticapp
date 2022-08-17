import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { reservasStyles } from '../styles/General'
import Horarios from '../components/reservas/Horarios'
import DrawHorarios from '../components/reservas/DrawHorarios'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import firebase from '../utils/firebase'
import 'firebase/compat/firestore'


const db = firebase.firestore(firebase)


export default function Reservas(props) {
  const { canchas, complejos } = props.route.params
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  var contador = []
  for (var i = 0; i < ((complejos.Cierre - 1) - complejos.Apertura); i++) {
    contador[i] = false
  }

  const [formData, setFormData] = useState({
    dateBirth: ''
  })
  const [reserva, setReserva] = useState([])

  //const stripePromise = loadStripe('pk_test_51HKPhDHBXfvF0l60R4RBbwKUqgcAUaPGCbeSo9Bpw5g4RrolVqmDDif8SFQKYieK3KaoyeKsSN3NzoNW18TiNFjb00m6MSZdKz');


  useEffect(() => {

    setReserva([]);
    db.collection("reservas")
      .where('CanchasId', '==', canchas.id)
      .where("Fecha", "==", formData.dateBirth)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        })
        setReserva(itemsArray);
      });
  }, [reload])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    handlerConfirm(selectedDate)
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const handlerConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0)
    dateBirth.setMinutes(0)
    dateBirth.setSeconds(0)

    setFormData({ ...formData, dateBirth });
    setReload(!reload)

  }

  return (
    <>
      <View style={reservasStyles.container}>

        <Text> {complejos.Nombre}-{canchas.Tamaño}</Text>

        <View style={[reservasStyles.input]}>
          <Text style={formData.dateBirth ? reservasStyles.pickers : reservasStyles.picker} onPress={showDatepicker}>
            {formData.dateBirth ? moment(date).format("LL")
              : "¿Que dia desea apartar su esta cancha?..."}

          </Text>
        </View>

        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
            />
          )}
        </View>
      </View>

      {formData.dateBirth ?
        <>

          {reserva.map((item, index) => (
            <Horarios
              key={index}
              reserva={item}
              canchas={canchas}
              contador={contador}
              complejos={complejos} />
          ))
          }
          <View >
            <ScrollView style={{ 
              marginTop: "25%",
              marginBottom: "5%"
            }} >
              <DrawHorarios contador={contador} canchas={canchas} formData={formData} setReload={setReload} reload={reload} complejos={complejos} />
            </ScrollView>
          </View>
        </>
        :
        <>
          <ScrollView style={reservasStyles.scroll} >
            <Text>Aun no se ha seleccionado ninguna fecha...</Text>
          </ScrollView>
        </>
      }
    </>
  )
}
