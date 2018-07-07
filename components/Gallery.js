import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, Image, Animated, Easing, Platform, TouchableOpacity } from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import SmartImage from './SmartImage';
import ScalableSmartImage from './ScalableSmartImage';
import Ripple from 'react-native-material-ripple';

import {getGallery} from '../api/FetchGallery';

import ChevronIconDown from '../images/ChevronIconDown'
import ChevronIconUp from '../images/ChevronIconUp'
import DownloadAllIcon from '../images/DownloadAllIcon'

import AnimatedListItem from './AnimatedListItem'

const _avatarSize = 36;
const _padding = 12;
const _screenWidth = Dimensions.get('window').width;

const _toolbarHeight = 72;
const _buttonSize = 48;
const _buttonContainerSize = 72;
const _toolBarMenuWidth = _buttonSize*3 + _padding;

var md5 = require('md5');

class Gallery extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
      translateY: new Animated.Value(0),
      backgroundColor: new Animated.Value(0),
      toolbarMenuScale: new Animated.Value(0.01),
      radius: 0,
      diameter: 0,
      menuOpen: false,
      gridMode: false,
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

  _toggleMenu() {
    if (!this.state.menuOpen) {
      Animated.parallel([
        Animated.timing(this.state.translateY, {
          easing: Easing.out(Easing.ease),
          duration: 150,
          toValue: _toolbarHeight/2 - 1,
        }),
        Animated.timing(this.state.backgroundColor, {
          duration: 150,
          toValue: 1,
        }),
        Animated.timing(this.state.toolbarMenuScale, {
          toValue: 1,
          duration: 150,
          delay: 150,
          easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        })
      ]).start(() => {
        this.setState({
          menuOpen: true
        });
      });
    } else {
      Animated.parallel([
        Animated.timing(this.state.translateY, {
          toValue: 0,
          easing: Easing.out(Easing.ease),
          duration: 150,
          delay: 150
        }),
        Animated.timing(this.state.backgroundColor, {
          toValue: 0,
          duration: 150,
          delay: 150
        }),
        Animated.timing(this.state.toolbarMenuScale, {
          toValue: 0.01,
          duration: 150,
        })
      ]).start(() => {
        this.setState({
          menuOpen: false
        });
      });
    }
  }

  _editCode() {}

  _toggleGrid() {
    if (!this.state.gridMode) {
      this.setState({
        gridMode: true
      })
    } else {
      this.setState({
        gridMode: false
      })
    }
  }

  _downloadAll() {}

  renderItems() {
    if (this.state.data && this.state.data.length > 0) {
      if (!this.state.gridMode) {
        return (
          <FlatList style={styles.list}
            data={this.state.data}
            renderItem={this._renderListItem}
            keyExtractor={this._keyExtractor}
          />
        );
      } else {
        data1 = [];
        data2 = [];
        for (var i = 0; i < this.state.data.length; i++) {
          if ((i+2)%2==0) {
            console.log('data1.push');

            data1.push(this.state.data[i]);
          }
          else {
            console.log('data2.push');

            data2.push(this.state.data[i]);
          }
        }
        console.log('this.state.data = ' + this.state.data);
        console.log('data1 = ' + data1);
        console.log('data2 = ' + data2);

        return (
          <View style={styles.gridContainer}>
            <FlatList style={styles.gridRight}
              data={data1}
              renderItem={this._renderGridItem}
              keyExtractor={this._keyExtractor}
            />
            <FlatList style={styles.gridLeft}
              data={data2}
              renderItem={this._renderGridItem}
              keyExtractor={this._keyExtractor}
            />
          </View>
        );
      }
    } else {
      return (
        <Text>Error Data not loaded</Text>
      )
    }
  }

  _keyExtractor = (item, index) => '' + index;

  _renderListItem = ({item, index}) => (
        <AnimatedListItem style={styles.item}
            source={{uri: item.imageUrl}}
            index={index}>
          <View style={styles.itemInfo}>
            <View style={styles.itemInfoAvatar}>
            <ScalableSmartImage style={styles.itemInfoAvatar}
            width={_avatarSize}
              source={{
                filename: item.avatarFilename,
                uri: item.avatar}}
                type={'avatar'}/>
            </View>
            <Text style={styles.itemInfoName}>{item.name}</Text>
          </View>
          <ScalableSmartImage style={styles.image}
            width={_screenWidth - _padding*2}
            source={{
              filename: item.imageFilename,
              uri: item.imageUrl}}
              type={'image'}/>
        </AnimatedListItem>
  );

  _renderGridItem = ({item, index}) => (
    <AnimatedListItem style={styles.item}
        source={{uri: item.imageUrl}}
        index={index}>
      <View style={styles.itemInfo}>
        <View style={styles.itemInfoAvatar}>
        <ScalableSmartImage style={styles.itemInfoAvatar}
        width={_avatarSize}
          source={{
            filename: item.avatarFilename,
            uri: item.avatar}}
            type={'avatar'}/>
        </View>
        <Text style={styles.itemInfoName}>{item.name}</Text>
      </View>
      <ScalableSmartImage style={styles.image}
        width={_screenWidth/2 - _padding*2}
        source={{
          filename: item.imageFilename,
          uri: item.imageUrl}}
          type={'image'}/>
    </AnimatedListItem>
  );

  render() {
    const translateY = this.state;
    const backgroundColor = this.state.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF', '#EFEFEF']
    });

    return (
      <View style={styles.container}>
        <View style={styles.toolbarPadding} />
        <View style={styles.toolbar}>
          <View style={styles.toolbarContents}>
            <Text style={styles.toolbarText}>Event Name Here</Text>
          </View>
        </View>
        <Animated.View style={[styles.toolbarMenuContainer, {transform: [{translateY: this.state.translateY}]}]}>
          <Animated.View style={[styles.toolbarMenu, {transform: [{scale: this.state.toolbarMenuScale}]}]} >
            <Animated.View style={[styles.toolbarMenuContent, {backgroundColor}]} >
              <Animated.View style={[styles.toolbarMenuContentContainer]} >
                <TouchableOpacity style={styles.toolbarButton}
                  onPress={ () => {
                    this._editCode()}
                  }>
                  <Text style={styles.toolbarButtonText}>C0D3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toolbarButton}
                  onPress={ () => {
                    this._downloadAll()}
                  }>
                  <View style={styles.toolbarButtonIconContainer}>
                    <DownloadAllIcon invisible={this.state.downloadAllAvailable}/>
                  </View>
                </TouchableOpacity>
                <View style={styles.toolbarMenuSpacer} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.toolbarButtonContainer]}>
            <Animated.View style={[styles.toolbarButton,{backgroundColor}]} >
              <TouchableOpacity style={[styles.toolbarButton]}
                onPress={ () => {
                  this._toggleMenu()}
                }>
                <View style={styles.toolbarButtonIconContainer}>
                  <ChevronIconUp invisible={!this.state.menuOpen}/>
                </View>
                <View style={styles.toolbarButtonIconContainer}>
                  <ChevronIconDown invisible={this.state.menuOpen}/>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </Animated.View>
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
  list: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  gridRight: {

  },
  gridLeft: {

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
    width: _avatarSize,
    height: _avatarSize,
    borderRadius: _avatarSize/2,
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
  toolbar: {
    width: '100%',
    height: _toolbarHeight,
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2, },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 2,
  },
  toolbarContents: {
    width: '100%',
    height: _toolbarHeight,
    alignItems: 'center',
    flexDirection: 'row',
  },
  toolbarText: {
    flex: 1,
    paddingLeft: _buttonContainerSize,
    paddingRight: _buttonContainerSize,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  toolbarMenuContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    position: 'absolute',
    width: _toolBarMenuWidth*2,
    height: _buttonContainerSize*2,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  toolbarMenu: {
    position: 'absolute',
    width: _toolBarMenuWidth*2,
    height: (_buttonSize*2),
    top: -_padding,
    right: -_toolBarMenuWidth + _padding,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  toolbarMenuContent: {
    flex: 1,
    position: 'absolute',
    width: _toolBarMenuWidth,
    height: _buttonSize,
    paddingLeft: _padding,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  toolbarMenuContentContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  toolbarButtonContainer: {
    position: 'absolute',
    width: _buttonContainerSize,
    height: _buttonContainerSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarButton: {
    width: _buttonSize,
    height: _buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: _buttonSize/2,
    zIndex: 1,
  },
  toolbarButtonIconContainer: {
    position: 'absolute',
  },
  toolbarButtonText: {
    textAlign: 'center',
  },
  toolbarMenuSpacer: {
    width: _buttonSize - _padding,
    backgroundColor: 'transparent',
  },
});

export default Gallery;
