import React, { Component } from 'react';
import { ListItem, Avatar, Icon } from '@rneui/themed'
import { View } from 'react-native';

export default function List(props) {
    const { complejos, navigation } = props
    const { Nombre, Descripcion, Image, height } = complejos

    return (
        <View>
            <ListItem bottomDivider containerStyle={{ backgroundColor: "rgba(255,255,255,0.3)", margin: 10 }} onPress={() => navigation.navigate("CanchasList", {complejos})} >
                <Avatar source={{ uri: Image[0] }} />
                <ListItem.Content>
                    <ListItem.Title>{Nombre}</ListItem.Title>
                    <ListItem.Subtitle numberOfLines={2}>{Descripcion}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    name='magnifying-glass'
                    type='entypo'
                    color='#000'

                />
            </ListItem>
        </View>
    )
}
