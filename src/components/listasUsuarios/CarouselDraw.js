import React, {useEffect, useState, useRef} from 'react';
import {Image as Imagen, Text, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {listComplejosStyles} from '../../styles/General';

const {width} = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7);

const CarouselCardItem = ({ item, index }) => {
  console.log(item.Image[0])
  return (
    <View style={styles.container} key={index}>
      <Imagen style={styles.image}  source={{uri: item.Image[0]}} ></Imagen>
      <View style={styles.title1}>
        <Text style={styles.title1} numberOfLines={3}>
        </Text>
        <Text style={styles.title} numberOfLines={3}>
          {item.Nombre}
        </Text>
      </View>
    </View>
  )
}


export default function CarouselDraw(props) {
  const {complejos} = props;
  const {Nombre, Image, height} = complejos;


  return (
      <View style={styles.container}>
         <Carousel
         mode='parallax'
     width={width}
     height={350}
     autoPlay={true}
        data={complejos}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={CarouselCardItem}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        loop
        autoPlayInterval={2000}
        inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
   
      },
    item: {
      width: screenWidth - 110,
      height: screenWidth - 115,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title:{
        color: "#fff",
        flex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 26
    },
    title1:{
        color: "#fff",
        flex: 8
    },
    title2:{
        color: "#000",
        position: "absolute",
        height: screenWidth - 115,
        width: screenWidth - 110,

    }
  })