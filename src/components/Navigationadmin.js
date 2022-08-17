import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, ImageBackground } from 'react-native'
import { navigationRef } from './RootNavigation';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { DrawerStyles } from '../styles/General'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Splash from '../screens/Splash'
import Auth from '../screens/Auth'
import Logout from '../screens/Logout'
//import firebase from '../utils/firebase'
import PerfilAdmin from '../screens/PerfilAdmin'
import Chat from '../screens/Chat'
//import Stripe from '../screens/Stripe'
//import Reservas from '../screens/Reservas'
import Chats from '../screens/Chats'
import Complejos from '../screens/Complejos'
import Canchas from '../screens/Canchas'
import DetalleCanchas from '../screens/DetalleCanchas'
import CanchasList from '../screens/CanchasList'
import ComplejosList from '../screens/ComplejosList'
import UserInfo from '../screens/UserInfo'
import Search from '../screens/Search'
//import { auth } from "firebase";
import 'react-native-gesture-handler';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const btnDrawer = (props) => {

  return (
    <TouchableOpacity style={{ paddingLeft: 20 }}>
        <FontAwesome size={30} color="#900" name="bars" style={{ color: "#fff" }} onPress={() => props.navigation.openDrawer()} />
            </TouchableOpacity>
  )
}

const btnSearch = (props) => {

  return (
    <TouchableOpacity style={{ paddingRight: 20 }}  onPress={() => props.navigation.navigate("Search")}>
      <FontAwesome size={30} color="#900" name="search" style={{ color: "#fff" }} />
    </TouchableOpacity>
  )
}

function StackNavigatorPerfilAdmin(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen  options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props), headerRight: () => btnSearch(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'  }} name="PerfilAdmin" component={PerfilAdmin} />
      <Stack.Screen options={{ title: 'Buscar Usuario', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="Search" component={Search} />
      <Stack.Screen options={{ title: 'Informacion del contacto', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="UserInfo" component={UserInfo} />
      <Stack.Screen options={{ title: 'Detalles' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="DetalleCanchas" component={DetalleCanchas} />
      <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
      <Stack.Screen name="Login" component={Auth} />
      <Stack.Screen options={{ title: 'Complejos Deportivos', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Complejos" component={Complejos} />
      <Stack.Screen options={{ title: 'Chats' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Chats" component={Chats} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Logout" component={Logout} />
    </Stack.Navigator>
  );
}
function StackNavigatorComplejos(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ title: 'Complejos Deportivos', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Complejos" component={Complejos} />
      <Stack.Screen options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="PerfilAdmin" component={PerfilAdmin} />
      <Stack.Screen options={{ title: 'Canchas', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Canchas" component={Canchas} />
      <Stack.Screen options={{ title: 'Detalles' , headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="DetalleCanchas" component={DetalleCanchas} />
      <Stack.Screen options={{ title: 'Chats' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Chats" component={Chats} />
      <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Logout" component={Logout} />
      <Stack.Screen name="Login" component={Auth} />
    </Stack.Navigator>
  );
}
function StackNavigatorChats(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ title: 'Chats' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Chats" component={Chats} />
    <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
      <Stack.Screen options={{ title: 'Complejos Deportivos', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Complejos" component={Complejos} />
      <Stack.Screen options={{ title: 'Detalles' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="DetalleCanchas" component={DetalleCanchas} />
      <Stack.Screen options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="PerfilAdmin" component={PerfilAdmin} />
      <Stack.Screen options={{ title: 'Canchas' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Canchas" component={Canchas} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="Logout" component={Logout} />
      <Stack.Screen name="Login" component={Auth} />
    </Stack.Navigator>
  );
}

function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={[DrawerStyles.menuContainer]}>
        <View style={[DrawerStyles.iconoContainer]}>
        <FontAwesome name={`${props.iconName}`}size={20}/>
        </View>
        <View style={[DrawerStyles.tituloContainer]}>
          <Text style={[DrawerStyles.tituloTxt]}>{props.titleName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Menu(props) {
  const { user, isEnabled, setIsEnabled, navigation } = props;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
//console.log(auth().signOut())
  return (

    <View style={[DrawerStyles.container]}>
      <ImageBackground
        source={require('../images/banner.jpg')}
        style={{ width: undefined, }}
      >
        <View style={[DrawerStyles.bgContainer]} >
          <TouchableOpacity>
            <View style={[DrawerStyles.userContainer]}>
              <Image style={[DrawerStyles.userImagen]} source={{ uri: (user.photoURL) }} />
              <View style={[DrawerStyles.camaraContainer]}>
                <Image style={[DrawerStyles.camaraIcon]} source={require('../images/photo-camera.png')} />
              </View>
            </View>
            <View style={[DrawerStyles.userNombre]}>
              <Text style={[DrawerStyles.userTitulo]}>{user.displayName}</Text>
              <Text style={[DrawerStyles.userEmail]}>{user.email}</Text>
              <Text style={[DrawerStyles.userSubTitulo]}>Ver Perfil</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={[DrawerStyles.aja]}>
        <View>
          <Text>Modo oscuro</Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#fff" : "#3cb08d"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <DrawerMenu iconName='user' titleName='Perfil' navigation={() => props.navigation.navigate('PerfilAdmin')} />
      <DrawerMenu iconName='inbox' titleName='Chats' navigation={() => props.navigation.navigate('Chats')} />
      <DrawerMenu iconName='star' titleName='Complejos' navigation={() => props.navigation.navigate('Complejos')} />
      <DrawerMenu iconName='power-off' titleName='Cerrar sesión' navigation={() => props.navigation.navigate('Logout')} />

    </View>
  )
}


export default function Navigationadmin(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={DarkTheme} >
      <Drawer.Navigator drawerContent={(props) => <Menu user={user} isEnabled={isEnabled} setIsEnabled={setIsEnabled} {...props} />}>
      <Drawer.Screen name="Splash" component={Splash} options={{headerShown: false}} />
        <Drawer.Screen name="Perfil" component={StackNavigatorPerfilAdmin} options={{headerShown: false}} />
        <Drawer.Screen name="Complejos" component={StackNavigatorComplejos} options={{headerShown: false}} />
        <Drawer.Screen name="Chats" component={StackNavigatorChats} options={{headerShown: false}} />
        <Drawer.Screen name="logout" component={Logout} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

