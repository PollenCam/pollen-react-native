import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8E087',
  },
});

class Dashboard extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Dashboard</Text>
      </View>
    );
  }
}

export default Dashboard;
