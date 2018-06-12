import React, { Component } from 'react';
import { ScrollView, Dimensions, View, StyleSheet, Platform, InteractionManager, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

import Camera from './Camera';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Stream from './Stream';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    width: window.width,
  },
  verticalItem: {
    flex: 1,
    height: window.height,
    width: window.width,
  },
});

class PollenScrollView extends Component {

  constructor(props) {
    super(props);
    this._scrollView = null;

    this._initialIndex = 1;

    this.state = {
      lastPinchDistance: -1,
      scrollEnabled: true,
    }
  }

  componentDidMount() {
    const offset = window.width * this._initialIndex;
    {/* This is really janky, but it seems to be necessary for Android */}
    if (Platform.OS === 'android') {
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          this._scrollView.scrollTo({ x: offset, animated: false });
        }, 10)
      })
    } else {
      this._scrollView.scrollTo({ x: offset, animated: false });
    }
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <ScrollView
          ref={(c) => this._scrollView = c}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          scrollEventThrottle={3}
          bounces={false}
          directionalLockEnabled={true}
          scrollEnabled={this.state.scrollEnabled}>
          <View key={0} style={styles.item}>
            <Dashboard />
          </View>
          <View key={1} style={styles.item}>
            <Camera
              zoomIn={(zoomIn) => { this.childZoomIn = zoomIn; }}
              zoomOut={(zoomOut) => { this.childZoomOut = zoomOut; }}/>
          </View>
          <View key={2} style={styles.item}>
            <Stream />
          </View>
        </ScrollView>
      </View>
    );
  }

  _calculateDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
  _processPinch(x1, y1, x2, y2) {
    console.log('_processPinch');

    const currentPinchDistance = this._calculateDistance(x1, y1, x2, y2);

    if (this.state.lastPinchDistance === -1) {
      this.setState({
        lastPinchDistance: currentPinchDistance,
      });
    }

    // pinchThreshold = this._lastPinchDistance * 0.05;
    pinchThreshold = 0;


    console.log('_processPinch currentPinchDistance = ' + currentPinchDistance);
    console.log('_processPinch lastPinchDistance = ' + this.state.lastPinchDistance);

    if (currentPinchDistance < (this.state.lastPinchDistance - pinchThreshold)) {
      console.log('pinch in');
      this.childZoomOut();
      this.setState({
        lastPinchDistance: currentPinchDistance,
      });
    } else if (currentPinchDistance > (this.state.lastPinchDistance + pinchThreshold)) {
      console.log('pinch out');
      this.childZoomIn();
      this.setState({
        lastPinchDistance: currentPinchDistance,
      });
    }
  }

  _panResponder = PanResponder.create({
    // onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const touches = evt.nativeEvent.touches;
      const length = touches.length;
      console.log('onPanResponderGrant, touches = ' + length);
      if (length === 1) {
        // this._setScrollState(SCROLL_STATE.dragging)
      } else if (length === 2) {
        // this._setScrollState(SCROLL_STATE.pinching)
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      const touches = evt.nativeEvent.touches;
      const length = touches.length;
      console.log('onPanResponderMove, touches = ' + length);
      // if (this._scrollState === SCROLL_STATE.pinching) {
        if (length === 2) {
          this.setState({ scrollEnabled: false });
          const [touch1, touch2] = touches;
          this._processPinch(
            touch1.locationX,
            touch1.locationY,
            touch2.locationX,
            touch2.locationY
          );
        }
      },
    onPanResponderRelease: () => {
      console.log('onPanResponderRelease')
      this.setState({ scrollEnabled: true });
    },
    onPanResponderTerminate: () => console.log('onPanResponderTerminate'),
    onPanResponderTerminationRequest: (evt, gestureState) => true
  })
}

export default PollenScrollView;
