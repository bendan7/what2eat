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
  StyleSheet, Text, View, ScrollView, Image, Button
} from 'react-native';


type Props = {};
const data = [{

  id: 1234,
  title: 'Best Vegan Burger - Best Vegan Burger',
  shortdesc: 'Short description of the dish-bla bla bla bla bla bla bla bla bla',
  preptime: '30 min',
  level: 'Easy',
  img: require('./food.jpg')
},
{
  id: 1235,
  title: 'Best Vegan Burger - Best Vegan Burger',
  shortdesc: 'Short description of the dish-bla bla bla bla bla bla bla bla bla',
  preptime: '30 min',
  level: 'Easy',
  img: require('./food.jpg')
}];

export default class ScrollviewComp extends Component<Props> {
  renderRecipes = () => data.map((item) => {
    return (
      <View style={styles.container} key={item.id}>
        <Image style={styles.img} source={item.img} />
        <Text style={{ padding: 10, fontSize: 32, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ paddingHorizontal: 10, fontSize: 20, fontStyle: 'italic' }}>{item.shortdesc}</Text>
        <View style={{ padding: 20, fontSize: 30 }}>
          <Text style={styles.txt}>Preparation time: {item.preptime}</Text>
          <Text style={styles.txt}>Difficulty: {item.level}</Text>
          <Button title="See Recipe" color="#505160" accessibilityLabel="Learn more about this purple button" />
        </View>
      </View>
    );
  })

  render() {
    return (
      <ScrollView horizontal={true} >
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  txt: {
    fontSize: 18
  }
});
