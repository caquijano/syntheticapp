import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, ImageBackground } from 'react-native'
import { navigationRef } from '../components/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { DrawerStyles } from '../styles/General'
import { NativeBaseProvider  } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Splash from '../screens/Splash'
import Perfil from '../screens/Perfil'
import Chat from '../screens/Chat'
import Chats from '../screens/Chats'
import Logout from '../screens/Logout'
import CanchasList from '../screens/CanchasList'
import ComplejosList from '../screens/ComplejosList'
import Reservas from '../screens/Reservas'
import MisReservas from '../screens/MisReservas'
import UserInfo from '../screens/UserInfo'
import Search from '../screens/Search'



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const btnDrawer = (props) => {

  return (
    <NativeBaseProvider>
      <TouchableOpacity style={{ paddingLeft: 20 }}>
        <FontAwesome size={30} color="#900" name="bars" style={{ color: "#fff", top:15 }} onPress={() => props.navigation.openDrawer()} />
      </TouchableOpacity>
    </NativeBaseProvider>

  )
}
const btnSearch = (props) => {

  return (
    <NativeBaseProvider >
      <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => props.navigation.navigate("Search")}>
        <FontAwesome size={30} color="#900" name="search" style={{ color: "#fff" , top:15 }} />
      </TouchableOpacity>
    </NativeBaseProvider>

  )
}

function StackNavigatorPerfil(props) {
  return (
    
      <Stack.Navigator>
      <Stack.Screen  options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props), headerRight: () => btnSearch(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'  }} name="Perfil" component={Perfil} />
      <Stack.Screen options={{ title: 'Buscar Usuario', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="Search" component={Search} />
      <Stack.Screen options={{ title: 'Informacion del contacto', headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff'}} name="UserInfo" component={UserInfo} />
      <Stack.Screen options={{ title: 'Chat', headerShown: false}} name="Chat" component={Chat} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props) }} name="Logout" component={Logout} />
    </Stack.Navigator>
   

  );
}
function StackNavigatorChats(props) {
  return (
   
      <Stack.Navigator>
        <Stack.Screen options={{ title: 'Chats', headerLeft: () => btnDrawer(props), headerStyle: { backgroundColor: '#0a414e' }, headerTintColor: '#fff' }} name="Chats" component={Chats} />
        <Stack.Screen options={{ title: 'Chat', headerShown: false }} name="Chat" component={Chat} />
      </Stack.Navigator>
   
  );
}
function StackNavigatorComplejosList(props) {
  return (
   
      <Stack.Navigator>
        <Stack.Screen options={{ title: 'Complejos', headerLeft: () => btnDrawer(props), headerStyle: { backgroundColor: '#0a414e' }, headerTintColor: '#fff' }} name="ComplejosList" component={ComplejosList} />
        <Stack.Screen options={{ title: 'Canchas', headerStyle: { backgroundColor: '#0a414e' }, headerTintColor: '#fff' }} name="CanchasList" component={CanchasList} />
        <Stack.Screen options={{ title: 'Reservas', headerStyle: { backgroundColor: '#0a414e' }, headerTintColor: '#fff' }} name="Reservas" component={Reservas} />
      </Stack.Navigator>
     
  );
}
function StackNavigatorMisReservas(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen options={{ title: 'Mis Reservas', headerLeft: () => btnDrawer(props), headerStyle:{ backgroundColor: '#0a414e'}, headerTintColor: '#fff' }} name="MisReservas" component={MisReservas} />
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
  const { user, isEnabled, setIsEnabled } = props;
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
      <View>
        <DrawerMenu iconName='user' titleName='Perfil' navigation={() => props.navigation.navigate('Perfil')} />
        <DrawerMenu iconName='inbox' titleName='Chats' navigation={() => props.navigation.navigate('Chats')} />
        <DrawerMenu iconName='futbol-o' titleName='Complejos' navigation={() => props.navigation.navigate('ComplejosList')} />
        <DrawerMenu iconName='calendar-check-o' titleName='Reservas' navigation={() => props.navigation.navigate('MisReservas')} />
        <DrawerMenu iconName='power-off' titleName='Cerrar sesión' navigation={() => props.navigation.navigate('Logout')} />
      </View>
    </View>
  )
}


export default function Navigation(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={DarkTheme}>
      <Drawer.Navigator drawerContent={(props) => <Menu user={user} isEnabled={isEnabled} setIsEnabled={setIsEnabled} {...props} />}>
        <Drawer.Screen name="Perfil" component={StackNavigatorPerfil} options={{headerShown: false}} />
        <Drawer.Screen name="Chats" component={StackNavigatorChats} options={{headerShown: false}} />
        <Drawer.Screen name="ComplejosList" component={StackNavigatorComplejosList} options={{headerShown: false}} />
        <Drawer.Screen name="MisReservas" component={StackNavigatorMisReservas} options={{headerShown: false}} /> 
        <Drawer.Screen name="logout" component={Logout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

