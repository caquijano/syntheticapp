import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {listComplejosStyles} from '../styles/General';
import CanchasList from '../components/canchasAdmin/CanchasListAdmin';
import CanchasForm from '../components/canchasAdmin/CanchasForm';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { FAB } from '@rneui/themed';

const db = firebase.firestore(firebase);

const widthScreen = Dimensions.get('window').width;

export default function Canchas(props) {
  const {navigation} = props;
  const {complejos} = props.route.params;
  const {id, Nombre, Descripcion} = complejos;
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [canchas, setCanchas] = useState([]);
  const [imaData, setImaData] = useState({
    imagePath: '',
  });

  useEffect(() => {
    setCanchas([]);
    db.collection('canchas')
      .where('ComplejosId', '==', id)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        setCanchas(itemsArray);
      });

    setReloadData(false);
  }, [reloadData]);

  return (
    <>
      <LinearGradient style={{height: '100%'}} colors={['#fff', '#0a414e']}>
        <ScrollView>
          <View style={[listComplejosStyles.content]}>
            <View style={[listComplejosStyles.containerlist]}>
              {form ? (
                <CanchasForm
                  navigation={navigation}
                  formData={formData}
                  setFormData={setFormData}
                  setReloadData={setReloadData}
                  reloadData={reloadData}
                  canchas={canchas}
                  setCanchas={setCanchas}
                  imaData={imaData}
                  setImaData={setImaData}
                  setForm={setForm}
                  form={form}
                  complejos={complejos}
                />
              ) : (
                <View>
                  {canchas.map((item, index) => (
                    <CanchasList
                      key={index}
                      canchas={item}
                      setForm={setForm}
                      navigation={navigation}
                      complejos={complejos}
                    />
                  ))}
                </View>
              )}
            </View>
            <View style={[listComplejosStyles.footer]}>
              <TouchableOpacity onPress={() => setForm(!form)}>
              {form ? (
                 <FAB
                 onPress={() => setForm(!form)}
                 visible={true}
                 icon={{ name: 'chevron-left', color: 'white' }}
                 color="#911"
               />
              ) : (
                <FAB
                onPress={() => setForm(!form)}
                visible={true}
                icon={{ name: 'add', color: 'white' }}
                color="#0a414e"
              />
              )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}

/*

*/
