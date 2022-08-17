import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import RNPickerSelect from 'react-native-picker-select'
import {Picker} from 'react-native-woodpicker';
import {perfilStyles} from '../../styles/General';
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const db = firebase.firestore(firebase);

export default function FormDatos(props) {
  const {navigation, setReloadId, setReloadData} = props;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    handlerConfirm(selectedDate);
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
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({...formData, dateBirth});
  };
  const [pierna, setPierna] = useState(null);
  const Pierna = [
    {label: 'Derecha', value: 'Derecha'},
    {label: 'Zurda', value: 'Zurda'},
  ];
  const [posicion, setPosicion] = useState(null);
  const Posicion = [
    {label: 'Delantero', value: 'Delantero'},
    {label: 'Creador', value: 'Creador'},
    {label: 'Defensa', value: 'Defensa'},
    {label: 'Portero', value: 'Portero'},
  ];
  const AddUser = () => {
    console.log(firebase.auth().currentUser.uid);
    db.collection('users')
      .add({
        Email: firebase.auth().currentUser.email,
        Nombre: firebase.auth().currentUser.displayName,
        Foto: firebase.auth().currentUser.photoURL,
        UserId: firebase.auth().currentUser.uid,
        FechaNto: formData.dateBirth,
        Telefono: formData.telefono,
        Residencia: formData.residencia,
        Pierna: pierna.value,
        Posicion: posicion.value,
        Rol: 'user',
        createAt: new Date(),
        createBy: firebase.auth().currentUser.uid,
      })
      .then(() => {
        setReloadId(true);
        setReloadData(true);
      })
      .catch(() => {
        Alert.alert('Upps ocurrieron problemas');
      });
  };

  return (
    <ScrollView style={[perfilStyles.scroll]}>
      <View>
        <View style={[perfilStyles.input]}>
          <Text
            style={
              formData.dateBirth ? perfilStyles.pickers : perfilStyles.picker
            }
            onPress={showDatepicker}>
            {formData.dateBirth
              ? moment(date).format('LL')
              : 'Fecha de nacimineto'}
          </Text>
        </View>
        <TextInput
          style={[perfilStyles.input]}
          placeholder="Ciudad de residencia..."
          onChange={(e) =>
            setFormData({...formData, residencia: e.nativeEvent.text})
          }
        />
        <TextInput
          style={[perfilStyles.input]}
          placeholder="Telefono..."
          keyboardType="name-phone-pad"
          onChange={(e) =>
            setFormData({...formData, telefono: e.nativeEvent.text})
          }
        />
        <View style={[perfilStyles.input]}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setPierna}
          items={Pierna}
          title="Pierna habil..."
          placeholder="Pierna habil..."
          item={pierna}
          isNullable
          //androidPickerMode="dropdown"
        />
        </View>
        <View style={[perfilStyles.input]}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setPosicion}
          items={Posicion}
          title="Posición de preferencia..."
          placeholder="Pierna Posición de preferencia..."
          item={posicion}
          isNullable
          //androidPickerMode="dropdown"
        />
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
            />
          )}
        </View>

        <View style={[perfilStyles.containerbtn]}>
          <TouchableOpacity style={[perfilStyles.buttonSave]}>
            <Text style={[perfilStyles.textbtn]} onPress={AddUser}>
              Guardar Informacion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const pickerStyle = StyleSheet.create({
  inputAndroid: {
    borderRadius: 25,
    paddingLeft: 15,
    width: "100%",
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#000',
  },
});
