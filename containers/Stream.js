import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4D35E',
  },
});

class Stream extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Stream</Text>
      </View>
    );
  }
}

export default Stream;
