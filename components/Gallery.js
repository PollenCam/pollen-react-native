import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, Image } from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import Mask from "react-native-mask";

import {getGallery} from '../api/FetchGallery';

const _padding = 12;
const _screenWidth = Dimensions.get('window').width - (_padding*2);

class Gallery extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
    };

    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    getGallery()
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
        <FlatList style={styles.list}
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
  }

  _keyExtractor = (item, index) => '' + index;

  _renderItem = ({item}) => (
        <View style={styles.item}
            source={{uri: item.imageUrl}}>
          <View style={styles.itemInfo}>
            <View style={styles.itemInfoAvatar}>
              <Mask shape={'circle'}>
                <Image style={styles.itemInfoAvatar}
                  source={{uri: item.avatar}}/>
              </Mask>
            </View>
            <Text style={styles.itemInfoName}>{item.name}</Text>
          </View>
          <ScalableImage style={styles.image}
            width={_screenWidth}
            source={{uri: item.imageUrl}} />
        </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbarPadding} />
        <View style={styles.toolbar}>
          <Text style={styles.toolbarText}>Event Name Here</Text>
        </View>
        { this.renderItems() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  toolbarPadding: {
    height: 72,
  },
  toolbar: {
    width: '100%',
    height: 72,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    shadowOffset:{ width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 2,
  },
  toolbarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: _padding
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: _padding,
    paddingBottom: _padding,
    alignItems: 'center',
  },
  itemInfoAvatar: {
    width: 36,
    height: 36
  },
  itemInfoName: {
    paddingLeft: 8,
  },
  image: {
    flex: 1,
    borderRadius: 12,
    paddingTop: _padding,
    paddingBottom: _padding,
  },
});

export default Gallery;
