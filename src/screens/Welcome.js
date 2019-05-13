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
import { Text, View, Button, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
type Props = {};

class Welcome extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to What2Eat!</Text>
        <Text style={styles.instructions}>The first Recipes search app that will help you find what 
        to eat base on what you have in the fridge
        </Text>
        <Button title="See Recipe" color="#505160" onPress={() => this.props.navigation.navigate('Page1')}  />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
   header: null
  }
  },
  Page1: {
    screen: Page1,
      navigationOptions: {
   header: null
  }
  }
});

export default createAppContainer(AppNavigator);
