import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {map} from 'lodash';
import {ComplejosStyles} from '../../styles/General';
import {Picker} from 'react-native-woodpicker';
import ImagePicker from 'react-native-image-picker';
//import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import uuid from "random-uuid-v4";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
//import 'firebase/compat/firestore';


const db = firebase.firestore(firebase);

export default function ComplejoForm(props) {
  const [reload, setReload] = useState(false);
  const {
    form,
    setForm,
    imaData,
    setImaData,
    formData,
    setFormData,
    reloadData,
    setReloadData,
  } = props;
  const [apertura, setApertura] = useState(null);
  const [cierre, setCierre] = useState(null);

  const data = [
    {label: '1 AM', value: 1},
    {label: '2 AM', value: 2},
    {label: '3 AM', value: 3},
    {label: '4 AM', value: 4},
    {label: '5 AM', value: 5},
    {label: '6 AM', value: 6},
    {label: '7 AM', value: 7},
    {label: '8 AM', value: 8},
    {label: '9 AM', value: 9},
    {label: '10 AM', value: 10},
    {label: '11 AM', value: 11},
    {label: '12 PM', value: 12},
  ];

  const data2 = [
    {label: '1 PM', value: 13},
    {label: '2 PM', value: 14},
    {label: '3 PM', value: 15},
    {label: '4 PM', value: 16},
    {label: '5 PM', value: 17},
    {label: '6 PM', value: 18},
    {label: '7 PM', value: 19},
    {label: '8 PM', value: 20},
    {label: '9 PM', value: 21},
    {label: '10 PM', value: 22},
    {label: '11 PM', value: 23},
    {label: '12 AM', value: 24},
  ];

  const AddComplejo = () => {
    uploadImageStorage().then((response) => {
      db.collection('complejos')
        .add({
          Nombre: formData.complejoName,
          Direccion: formData.complejoAddress,
          Telefono: formData.complejoPhone,
          Descripcion: formData.complejoDescription,
          Apertura: apertura.value,
          Cierre: cierre.value,
          Image: response,
          createAt: new Date(),
          createBy: firebase.auth().currentUser.uid,
        })
        .then(() => {
          Alert.alert('Complejo creada satisfactoriamente');
          setReloadData(!reloadData);
          setForm(!form);
        })
        .catch(() => {
          Alert.alert('Complejo creada satisfactoriamente');
          setReloadData(!reloadData);
          setForm(!form);
        });
    });
  };
  const uploadImageStorage = async () => {
    const imageBlob = [];
    await Promise.all(
      map(imaData, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref('complejos').child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`complejos/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            });
        });
      }),
    );
    return imageBlob;
  };
  const imageSelect = async () => {
    const options = {
      title: 'Seleccionar imagenes',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('user cancell');
      } else if (response.error) {
        console.log('user cancell' + response.error);
      } else if (response.customButton) {
        console.log('user tapped custombutton' + response.customButton);
      } else {
        (imaData.imagePath = response.uri), setReload(true);
      }
    });
  };

  useEffect(() => {
    setReload(false);
  }, [reload]);
  return (
    <View style={[ComplejosStyles.container]}>
      <TextInput
        style={[ComplejosStyles.input]}
        placeholder="Nombre del complejo..."
        onChange={(e) =>
          setFormData({...formData, complejoName: e.nativeEvent.text})
        }
      />
      <TextInput
        style={[ComplejosStyles.input]}
        placeholder="Ubicacion..."
        onChange={(e) =>
          setFormData({...formData, complejoAddress: e.nativeEvent.text})
        }></TextInput>

      <View style={styles.container}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setApertura}
          items={data}
          title="Horario de apertura"
          placeholder="Apertura..."
          item={apertura}
          isNullable
          //androidPickerMode="dropdown"
        />
        {/*<Picker
        style={pickerStyle.inputAndroid}
          selectedValue={apertura}
          onValueChange={(itemValue) => {
            setApertura(itemValue);
          }}>
          <Picker.Item label="Apertura..." value='null' />
          <Picker.Item label="1 AM" value="1" />
          <Picker.Item label="2 AM" value="2" />
          <Picker.Item label="3 AM" value="3" />
          <Picker.Item label="4 AM" value="4" />
          <Picker.Item label="5 AM" value="5" />
          <Picker.Item label="6 AM" value="6" />
          <Picker.Item label="7 AM" value="7" />
          <Picker.Item label="8 AM" value="8" />
          <Picker.Item label="9 AM" value="9" />
          <Picker.Item label="10 AM" value="10" />
          <Picker.Item label="11 AM" value="11" />
          <Picker.Item label="12 PM" value="12" />
        </Picker>*/}
        <Text style={{fontSize: 30}}> - </Text>

        <Picker
          style={[pickerStyle.inputAndroid]}
          onItemChange={setCierre}
          placeholderStyle={{color: '#678'}}
          items={data2}
          title="Horario de cierre"
          placeholder="Cierre..."
          item={cierre}
          isNullable
          androidPickerMode="spinner"
        />
        {/*<Picker
            style={pickerStyle.inputAndroid}
          selectedValue={cierre}
          onValueChange={(itemValue) => {
            setCierre(itemValue);
          }}>
          <Picker label="Cierre..." value='null' />
          <Picker.Item label="1 PM" value="13" />
          <Picker.Item label="2 PM" value="14" />
          <Picker.Item label="3 PM" value="15" />
          <Picker.Item label="4 PM" value="16" />
          <Picker.Item label="5 PM" value="17" />
          <Picker.Item label="6 PM" value="18" />
          <Picker.Item label="7 PM" value="19" />
          <Picker.Item label="8 PM" value="20" />
          <Picker.Item label="9 PM" value="21" />
          <Picker.Item label="10 PM" value="22" />
          <Picker.Item label="11 PM" value="23" />
          <Picker.Item label="12 AM" value="24" />
        </Picker>*/}
      </View>

      <TextInput
        style={[ComplejosStyles.input]}
        placeholder="Telefono..."
        onChange={(e) =>
          setFormData({...formData, complejoPhone: e.nativeEvent.text})
        }
      />
      <TextInput
        style={[ComplejosStyles.inputBig]}
        placeholder="Descripcion..."
        onChange={(e) =>
          setFormData({...formData, complejoDescription: e.nativeEvent.text})
        }
      />
      {imaData.imagePath ? (
        <Image
          style={{width: 70, height: 70}}
          source={{uri: imaData.imagePath}}
        />
      ) : (
        <Text> Imagen requerida</Text>
      )}
      <View style={[ComplejosStyles.container2]}>
        <TextInput
          style={[ComplejosStyles.inputimg]}
          textContentType="location"
          placeholder={imaData.imagePath ? `${imaData.imagePath}` : 'Image.png'}
        />
        <TouchableOpacity
          onPress={imageSelect}
          style={[ComplejosStyles.button]}>
          <Text>Imagen +</Text>
        </TouchableOpacity>
      </View>
      <View style={[ComplejosStyles.containerbtn]}>
        <TouchableOpacity style={[ComplejosStyles.buttonSave]}>
          <Text style={[ComplejosStyles.textbtn]} onPress={AddComplejo}>
            Guardar Informacion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const pickerStyle = StyleSheet.create({
  inputAndroid: {
    borderRadius: 25,
    paddingLeft: 15,
    width: 120,
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#000',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderColor: '#00796b',
    borderWidth: 2,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});

/*const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    pickerStyle: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 5,
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      height: 40,
      width: 200,
    },
  });*/
