import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C77C3',
  },
});

class Camera extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Camera</Text>
      </View>
    );
  }
}

export default Camera;
