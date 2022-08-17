import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, ImageBackground } from 'react-native'
import { navigationRef } from '../components/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { DrawerStyles } from '../styles/General'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Splash from '../screens/Splash'
import Usuarios from '../screens/Usuarios'
import Auth from '../screens/Auth'
import Logout from '../screens/Logout'
import { auth } from "firebase";
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const btnDrawer = (props) => {

  return (
    <TouchableOpacity style={{ paddingLeft: 20 }}>
      <FontAwesome size={30} color="#900" name="bars" style={{ color: "#fff", top:15 }} onPress={() => props.navigation.openDrawer()} />
    </TouchableOpacity>
  )
}
function StackNavigatorUsuarios(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen  options={{ title: 'SyntheticApp', headerLeft: () => btnDrawer(props) }} name="Usuarios" component={Usuarios} />
      <Stack.Screen name="Login" component={Auth} />
      <Stack.Screen options={{ title: 'Logout' , headerLeft: () => btnDrawer(props) }} name="Logout" component={Logout} />
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
              <Image style={[DrawerStyles.userImagen]} source={require('../images/logo.png')} />
              <View style={[DrawerStyles.camaraContainer]}>
                <Image style={[DrawerStyles.camaraIcon]} source={require('../images/photo-camera.png')} />
              </View>
            </View>
            <View style={[DrawerStyles.userNombre]}>
              <Text style={[DrawerStyles.userTitulo]}>SyntheticApp</Text>
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
      <DrawerMenu iconName='user' titleName='Usuarios' navigation={() => props.navigation.navigate('Usuarios')} />
      <DrawerMenu iconName='power-off' titleName='Cerrar sesión' navigation={() => props.navigation.navigate('Logout')} />
    </View>
  )
}


export default function Navigation(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = props;

  return (
    <NavigationContainer ref={navigationRef} theme={isEnabled ? DarkTheme : DefaultTheme} >
      <Drawer.Navigator drawerContent={(props) => <Menu user={user} isEnabled={isEnabled} setIsEnabled={setIsEnabled} {...props} />}>
      <Drawer.Screen name="Usuarios" component={StackNavigatorUsuarios} />
        <Drawer.Screen name="logout" component={Logout} />  
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
