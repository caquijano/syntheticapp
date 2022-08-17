import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Icon, Image, ListItem } from '@rneui/themed';
import * as RootNavigation from '../RootNavigation'

export default function ListCanchas(props) {
  const { canchas, complejos } = props
  const { Tamaño, Tipo, Image, Techada } = canchas
  return (
    <View>

      <Card>

        <Card.Image
          source={{ uri: Image[0] }}
      
          PlaceholderContent={<ActivityIndicator />}
        />
        <Card.Divider />

    <ListItem bottomDivider containerStyle={{ backgroundColor: "rgba(255,255,255,0.3)", margin: 10 }} onPress={() => RootNavigation.navigate('Reservas',{canchas, complejos})} >

       <>
              <Icon active name="thumbs-up" />
              <Text>{Tamaño}</Text>
            </>
             <>

              <Text>Cesped {Tipo}</Text>
              <Text>Techada: {Techada}</Text>
            </>
            <TouchableOpacity style={{
              height: 40,
              width: 120,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }} onPress={() => RootNavigation.navigate('Reservas', { canchas, complejos })}>
              <Icon style={{
                fontSize: 17,
                color: '#0a414e'
              }} type="FontAwesome5" name="address-book" />
              <Text style={{
                fontSize: 17,
                color: '#0a414e'
              }}>  Reservar</Text>

            </TouchableOpacity>

</ListItem>
      </Card>
    </View>
  )
}
