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
import {CanchasStyles, ComplejosStyles} from '../../styles/General';
import ImagePicker from 'react-native-image-picker';
import {Picker} from 'react-native-woodpicker';
import uuid from 'random-uuid-v4';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


const db = firebase.firestore(firebase);

export default function CanchasForm(props) {
  const [reload, setReload] = useState(false);
  const [tamaño, setTamaño] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [techada, setTechada] = useState(null);
  const dataTamaño = [
    {label: 'Futbol 4', value: 'Futbol 4'},
    {label: 'Futbol 5', value: 'Futbol 5'},
    {label: 'Futbol 6', value: 'Futbol 6'},
    {label: 'Futbol 7', value: 'Futbol 7'},
    {label: 'Futbol 8', value: 'Futbol 8'},
    {label: 'Futbol 9', value: 'Futbol 9'},
    {label: 'Futbol 10', value: 'Futbol 10'},
    {label: 'Futbol 11', value: 'Futbol 11'},
  ];
  const dataTipo = [
    { label: 'Natural', value: 'Natural' },
    { label: 'Sintetico', value: 'Sintetico' },
  ];
  const dataTechada = [
    { label: 'Si', value: 'Si' },
    { label: 'No', value: 'No' },
  ];
  const {
    imaData,
    setImaData,
    formData,
    setFormData,
    reloadData,
    setReloadData,
    form,
    setForm,
    complejos,
  } = props;
  const {id} = complejos;
  const [formData2, setFormData2] = useState({
    ComplejosId: id,
    tamañoCancha: '',
    tipoCancha: '',
    canchaTechada: '',
    precio: '',
  });

  const AddCancha = () => {
    uploadImageStorage().then((response) => {
      db.collection('canchas')
        .add({
          ComplejosId: formData2.ComplejosId,
          Tamaño: tamaño.value,
          Tipo: tipo.value,
          Techada: techada.value,
          Precio: formData2.precio,
          Image: response,
          createAt: new Date(),
          createBy: firebase.auth().currentUser.uid,
        })
        .then(() => {
          Alert.alert('Cancha creada satisfactoriamente');
          setReloadData(!reloadData);
          setForm(!form);
        })
        .catch(() => {
          Alert.alert('Cancha creada satisfactoriamente');
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
        const ref = firebase.storage().ref('canchas').child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`canchas/${result.metadata.name}`)
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
    <>
    <View style={[CanchasStyles.containerx]}>
      <View style={[styles.container]}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setTamaño}
          items={dataTamaño}
          title="Tamaño de la cancha"
          placeholder="Tamaño..."
          item={tamaño}
          isNullable
          //androidPickerMode="dropdown"
        />
      </View>
      <View style={[styles.container]}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setTipo}
          items={dataTipo}
          title="Tipo de cesped"
          placeholder="Tipo..."
          item={tipo}
          isNullable
          //androidPickerMode="dropdown"
        />
     
      </View>
      <View style={[styles.container]}>
        <TextInput
          style={CanchasStyles.inputC}
          placeholder={'Precio...'}
          onValueChange={(value) => setFormData2({...formData2, precio: value})}
        />
      </View>

      <View style={[styles.container]}>
        <Picker
          style={pickerStyle.inputAndroid}
          placeholderStyle={{color: '#678'}}
          onItemChange={setTechada}
          items={dataTechada}
          title="¿La cancha es techada?"
          placeholder="¿Techada?"
          item={techada}
          isNullable
          //androidPickerMode="dropdown"
        />
      </View>
      <View style={[CanchasStyles.container]}>
        {imaData.imagePath ? (
          <Image
            style={{width: 70, height: 70}}
            source={{uri: imaData.imagePath}}
          />
        ) : (
          <Text> Imagen requerida</Text>
        )}
        <View style={[CanchasStyles.container2]}>
          <TextInput
            style={[CanchasStyles.inputimg]}
            textContentType="location"
            placeholder={
              imaData.imagePath ? `${imaData.imagePath}` : 'Image.png'
            }
          />
          <TouchableOpacity
            onPress={imageSelect}
            style={[CanchasStyles.button]}>
            <Text>Imagen+</Text>
          </TouchableOpacity>
        </View>
        <View style={[CanchasStyles.containerbtn]}>
          <TouchableOpacity style={[CanchasStyles.buttonSave]}>
            <Text style={[CanchasStyles.textbtn]} onPress={AddCancha}>
              Guardar Informacion
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </>
  );
}

const pickerStyle = StyleSheet.create({
  inputAndroid: {
    borderRadius: 25,
    paddingLeft: 15,
    width: "120%",
    height: 45,
    backgroundColor: '#fff',
    borderColor: '#000',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    width: '90%',
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
