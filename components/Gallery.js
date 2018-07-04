import React from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Dimensions, Image, Animated, Easing, Platform } from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import SmartImage from './SmartImage';
import ScalableSmartImage from './ScalableSmartImage';
import Ripple from 'react-native-material-ripple';

import {getGallery} from '../api/FetchGallery';

import ChevronIconDown from '../images/ChevronIconDown'
import ChevronIconUp from '../images/ChevronIconUp'

const _avatarSize = 36;
const _padding = 12;
const _screenWidth = Dimensions.get('window').width - (_padding*2);

const _toolbarHeight = 72;
const _buttonSize = 48;
const _buttonContainerSize = 72;
const _toolBarMenuWidth = 144;

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

  renderItems() {
    if (this.state.data && this.state.data.length > 0) {
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
            width={_screenWidth}
            source={{
              filename: item.imageFilename,
              uri: item.imageUrl}}
              type={'image'}/>
        </View>
  );

  render() {
    console.log('poop')
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
                <Text>Text</Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.toolbarButtonContainer]}>
            <Ripple style={[styles.toolbarButton, {backgroundColor}]}
              rippleContainerBorderRadius={_buttonSize/2}
              rippleOpacity={0}
              onPress={ () => {
                this._toggleMenu()}
              }>
              <View style={styles.toolbarButtonChevronContainer}>
                <ChevronIconUp invisible={!this.state.menuOpen}/>
              </View>
              <View style={styles.toolbarButtonChevronContainer}>
                <ChevronIconDown invisible={this.state.menuOpen}/>
              </View>
            </Ripple>
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
  },
  toolbarMenuContent: {
    position: 'absolute',
    width: _toolBarMenuWidth,
    height: _buttonSize,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarMenuContentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarButtonContainer: {
    position: 'absolute',
    width: _buttonContainerSize,
    height: _buttonContainerSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarButton: {
    position: 'absolute',
    width: _buttonSize,
    height: _buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: _buttonSize/2,
  },
  toolbarButtonChevronContainer: {
    position: 'absolute',
  },
});

export default Gallery;
