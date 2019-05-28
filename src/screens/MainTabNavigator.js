/* eslint-disable no-unused-vars */
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
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import RecentlyRecipesScreen from './RecentlyRecipesScreen.js';
import HomeScreen from './HomeScreen.js';

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
   header: null
  }
  },
  'recently recipes': {
    screen: RecentlyRecipesScreen,
      navigationOptions: {
      header: null
  }
  }
});

export default createAppContainer(AppNavigator);
