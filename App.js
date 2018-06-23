import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import PollenScrollView from './components/PollenScrollView'

import { actions as StatusAction } from './reducers/Status';

import store from './store';

export default class App extends React.Component {
  componentWillMount() {
    store.dispatch(StatusAction.start());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <PollenScrollView/>
        </View>
      </Provider>
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
