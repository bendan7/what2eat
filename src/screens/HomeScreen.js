/* eslint-disable no-underscore-dangle */
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
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Button from 'react-native-button';
import ExploreScreen from './ExploreScreen.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
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

class HomeScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to What2Eat</Text>
        <Text style={styles.instructions}>"Recipes Search" app based on what you have at home</Text>
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
          style={{ fontSize: 26, color: 'white' }}
          containerStyle={{ padding: 10, height: 70, width: SCREEN_WIDTH - 40, overflow: 'hidden', borderRadius: 8, backgroundColor: '#1E90FF', justifyContent: 'center', alignItems: 'center', }}
          onPress={() => this.props.navigation.push('ExploreScreen')} 
        >
          Let's start !
        </Button>
      </View>

    );
  }
}

const HomeScreenNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
    header: null
    }
    },
    ExploreScreen: {
      screen: ExploreScreen,
        navigationOptions: {
    header: null
    }
  }
  });

export default createAppContainer(HomeScreenNavigator);
