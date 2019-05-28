/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
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

const SERVER_IP = '10.100.102.2';
const PORT_NUM = '5000';
type Props = {};
let data = [];


export default class ScrollviewComp extends Component<Props> {

  constructor(Props) {
    super(Props);
  }
  
  componentWillMount() {
    this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      const algoId = navigation.getParam('algoId', 'NO-ID');
      if (algoId !== 'NO-ID') { 
        this.getPreviewInfo(algoId);
        this.props.navigation.setParams({ algoId: 'NO-ID' });     
      }
    });
  }


  async getPreviewInfo(algoId) {
    console.log('RUN getNextAttToAsk()');
    await fetch(`http://${SERVER_IP}:${PORT_NUM}/get-preview-info`, {
      method: 'POST',
      body: JSON.stringify({
      algoId: algoId,
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        data = data.concat(responseJson.recPreviewInfo);
        this.forceUpdate();
    })
    .catch((error) => {
        console.error(error.message + 'Error:get-preview-info');
    });
  }

  renderRecipes() {
    if (data.length === 0) {
      return (
          <Text style={{ fontSize: 28, textAlign: 'center' }}>No History...</Text>
      );
    }
    return data.map((item) => {
      return (
        <View style={styles.container} key={item.id}>
          <Image
          style={styles.img}
          source={{ uri: String(item.imageurl) }}
          />
          <Text style={{ padding: 5, fontSize: 24, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ paddingHorizontal: 10, paddingBottom: 50, fontSize: 20, fontStyle: 'italic' }}>{String(item.desc).substr(0, 100)}</Text>
          <Button style={{ height: 250, }} title="Full Recipe" color="#505160" onPress={() => { Linking.openURL(item.recipeURL); }} />
        </View>
      );
    });
  }

  render() {
    if (data.length !== 0) {
      return (
        <ScrollView horizontal={true}>
          {this.renderRecipes()}
        </ScrollView>
        );
      } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15, }}>
          {this.renderRecipes()}
        </View>
        );
      }
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
