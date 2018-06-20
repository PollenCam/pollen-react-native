import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

import {getStream} from '../api/FetchStream';


class Stream extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
    };

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    getStream()
    .then((res) => {
      if(res === undefined) {
        this.setState({
          error: 'Event not found'
        });
      } else {
        this.setState({
          data: res
        })
      }
    })
  }

  renderItems() {
    // console.log("dataLoaded = " + dataLoaded)
    if (this.state.data && this.state.data.length > 0) {
      // console.log("data = " + data)
      return (
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      );
    } else {
      return (
        <Text>Error Data not loaded</Text>
      )
    }

    // return this.state.data.map((dataItem, index) => {
    //   return (
    //     <View key = {index} style={styles.item}>
    //       <Text>{dataItem.name}</Text>
    //       <Image
    //         style={{width: 500, height: 500}}
    //         source={{uri: dataItem.imageUrl}}
    //       />
    //     </View>
    //   )
    // }
    //
    // );
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => (
        <View style={styles.item}>
          <Text>{item.name}</Text>
          <Image
            style={{width: 500, height: 500}}
            source={{uri: item.imageUrl}}
          />
        </View>
  );

  render() {
    return (
      <View style={styles.container}>
        { this.renderItems() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4D35E',
  },
  scrollView: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});


export default Stream;
