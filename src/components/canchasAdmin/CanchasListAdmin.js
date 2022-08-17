import React, { useEffect, useState } from 'react';
import { ListItem, Avatar, Icon, Text } from '@rneui/themed'
import { View } from 'react-native';
import * as RootNavigation from '../../components/RootNavigation'

export default function CanchasList(props) {
    const { canchas, setForm, navigation, complejos } = props
    const { Tamaño, Tipo, Image, Techada } = canchas

    const { hola } = "hola mundo"
    return (
        <>
            <View>
                <ListItem bottomDivider containerStyle={{ backgroundColor: "rgba(255,255,255,0.3)", margin: 10 }} onPress={() => navigation.navigate('DetalleCanchas', { canchas, complejos })} >
                    <Avatar source={{ uri: Image[0] }} />
                    <ListItem.Content>
                        <Text>Tamaño: {Tamaño}</Text>
                        <Text>Tipo de cesped: {Tipo}</Text>
                        <Text note numberOfLines={2}>Techada: {Techada}</Text>
                    </ListItem.Content>
                    <Icon
                        name='magnifying-glass'
                        type='entypo'
                        color='#000'

                    />
                </ListItem>
            </View>

        </>
    );
}