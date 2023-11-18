/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigations/appNavigator';
import {name as appName} from './app.json';
import ListUsers from './src/screns/listUsers';

AppRegistry.registerComponent(appName, () => App);
