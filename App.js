import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Camera from './containers/Camera';
import Dashboard from './containers/Dashboard';
import Profile from './containers/Profile';
import Stream from './containers/Stream';

import Drawer from './components/drawer.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Drawer>
        <Camera/>
        <Dashboard/>
        <Stream/>
      </Drawer>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
