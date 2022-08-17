import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

import {listComplejosStyles} from '../styles/General';
import ListAdmin from '../components/complejosAdmin/ListAdmin';
import ComplejoForm from '../components/complejosAdmin/ComplejoForm';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
//import 'firebase/compat/firestore';
import {Icon} from 'react-native-elements';
import { FAB } from '@rneui/themed';

import LinearGradient from 'react-native-linear-gradient';

const db = firebase.firestore(firebase);

const widthScreen = Dimensions.get('window').width;

export default function Complejos(props) {
  const {navigation} = props;
  const [formData, setFormData] = useState({});
  const [form, setForm] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [complejos, setComplejos] = useState([]);
  const [imaData, setImaData] = useState({
    imagePath: '',
  });
  console.log(firebase.auth().currentUser.uid);
  useEffect(() => {
    setComplejos([]);
    db.collection('complejos')
      .where('createBy', '==', firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        setComplejos(itemsArray);
      });

    setReloadData(false);
  }, [reloadData]);

  //const [isVisibleMap, setIsVisibleMap] = useState(false);
  // const [locationComplejo, setLocationComplejo] = useState(null);

  return (
    <>
    <LinearGradient style={{height:"100%"}} colors={['#fff', '#0a414e']}>
      <ScrollView>
        <View style={[listComplejosStyles.content]}>
          <View style={[listComplejosStyles.containerlist]}>
            {form ? (
              <ComplejoForm
                navigation={navigation}
                setReloadData={setReloadData}
                reloadData={reloadData}
                formData={formData}
                setFormData={setFormData}
                complejos={complejos}
                setComplejos={setComplejos}
                imaData={imaData}
                setImaData={setImaData}
                setForm={setForm}
                form={form}
              />
            ) : (
              <View>
                {complejos.map((item, index) => (
                  <ListAdmin
                    key={index}
                    complejos={item}
                    setForm={setForm}
                    navigation={navigation}
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

/*function Map(props) {
    const {
        isVisibleMap,
        setIsVisibleMap,
        setLocationComplejo,
    } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        let loc = [];
        (async () => {
            RNLocation.requestPermission({
                ios: 'whenInUse', // or 'always'
                android: {
                    detail: 'coarse', // or 'fine'
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            }).then(granted => {
                if (granted) {
                    loc = this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                        {
                            speed = -1,
                                longitude = -0.1337,
                                latitude = 51.50998
                        }
                    })
                }
            });
            console.log(loc)
            setLocation({

                latitude: loc.locations.latitude,
                longitude: loc.locations.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,


              });
        })();
    }, []);

    const confirmLocation = () => {
        setLocationComplejo(location);
        console.log("Localizacion guardada correctamente");
        setIsVisibleMap(false);
    };

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={modalStyles.map}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={modalStyles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicacion"
                        containerStyle={modalStyles.viewMapBtnContainerSave}
                        buttonStyle={modalStyles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicacion"
                        containerStyle={modalStyles.viewMapBtnContainerCancel}
                        buttonStyle={modalStyles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    );
}*/
