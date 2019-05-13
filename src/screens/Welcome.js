/* eslint-disable max-len */
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
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import Explore from './Explore.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 15,
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333333',
    marginBottom: 5,
  },
});
type Props = {};

class Welcome extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to What2Eat App</Text>
        <Text style={styles.instructions}>"Recipes Search" app based on what you have in the fridge</Text>
        <Image
         style={{ width: 150, height: 150 }}
         source={require('../asset/swipe-helper.gif')}
        />
        <View style={{ padding: 20 }}>
          
          <Text style={{ textAlign: 'center' }}>instructions:</Text>
          <Text style={styles.instructions}>Swip Right -> I have</Text>
          <Text style={styles.instructions}>Swip Left {'<-'} I don't have</Text>
        </View>
        <Button
          onPress={console.log('press')}
          title="Learn More"
          color="#841584"
          style={{ padding: 20 }}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>

    );
  }
}

const AppNavigator = createBottomTabNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
   header: null
  }
  },
  Explore: {
    screen: Explore,
      navigationOptions: {
      header: null
  }
  }
});

export default createAppContainer(AppNavigator);
