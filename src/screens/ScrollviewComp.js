/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
/* eslint-disable global-require */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/prefer-stateless-function */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, Button, Linking
} from 'react-native';

const SERVER_IP = '172.20.10.5';
const PORT_NUM = '5005';
type Props = {};
let data = [{

  id: 1234,
  title: 'loading...',
  shortdesc: 'loading...',
  preptime: 'loading...',
  level: 'loading...',
  imageurl: require('./food.jpg')
},
];

export default class ScrollviewComp extends Component<Props> {
  constructor(){
    super();
  }


  componentWillMount() {
    console.log('!!!!!!!!!!!!!!!!!');
      fetch(`http://${SERVER_IP}:${PORT_NUM}/get-preview-info`, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson.recPreviewInfo;
        console.log(data);
        this.forceUpdate();
      })
      .catch((error) => {
         console.error(error);
      });
  }


  renderRecipes() {
    return data.map((item) => {
    return (
      <View style={styles.container} key={item.id}>
        <Image
         style={styles.img}
         source={{ uri: String(item.imageurl) }}
        />
        <Text style={{ padding: 5, fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ paddingHorizontal: 10, paddingBottom: 50, fontSize: 20, fontStyle: 'italic' }}>{String(item.desc).substr(0, 100)}</Text>
        <Button style={{ height: 250, }} title="Full Recipe" color="#505160" onPress={() => { Linking.openURL('https://google.com'); }} />
      </View>
    );
  });
  }

  render() {
    return (
      <ScrollView horizontal={true}>
        {this.renderRecipes()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#AEBD38',
    width: 350,
    borderRadius: 50,
  },
  img: {
    width: 350,
    height: 350,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

});
