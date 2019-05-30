/* eslint-disable import/no-unresolved */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
import App from './src/screens/MainTabNavigator.js';
import { name as appName } from './app.json';
import './src/global.js';

AppRegistry.registerComponent(appName, () => App);
