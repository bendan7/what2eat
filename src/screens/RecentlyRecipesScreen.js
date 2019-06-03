/* eslint-disable no-extend-native */
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


type Props = {};
const data = [];


export default class ScrollviewComp extends Component<Props> {

  constructor() {
    super();
    // check if an element exists in array using a comparer function
    // comparer : function(currentElement)
    Array.prototype.inArray = function (comparer) { 
    for (let i = 0; i < this.length; i++) { 
        if (comparer(this[i])) return true; 
    }
    return false; 
    }; 

    // adds an element to the array if it does not already exist using a comparer 
    // function
    Array.prototype.pushIfNotExist = function (element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
    }; 
  }
  
 
  componentWillMount() {
    this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      const algoId = navigation.getParam('algoId', 'NO-ID');
      if (algoId !== 'NO-ID') { 
        console.log(algoId);
        this.getPreviewInfo(algoId);
        this.props.navigation.setParams({ algoId: 'NO-ID' });     
      }
    });
  }


  async getPreviewInfo(algoId) {
    console.log('RUN ggetPreviewInfo()' + algoId);
    await fetch(`http://${global.SERVER_IP}:${global.PORT_NUM}/get-preview-info`, {
      method: 'POST',
      body: JSON.stringify({
      algoId: algoId,
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        responseJson.recPreviewInfo.forEach(element => {
          data.pushIfNotExist(element, (e) => { return e.id === element.id; });
        });
        //data = data.concat(responseJson.recPreviewInfo);
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
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 45 }}>
            <Button style={{ height: 250, }} title="Full Recipe" color="#505160" onPress={() => { Linking.openURL(item.recipeURL); }} />
          </View>
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
