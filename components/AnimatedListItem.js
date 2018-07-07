import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'

export default class AnimatedListItem extends React.Component {

   _defaultDuration = 400;
   _indexMultiplier = 50;

   state = {
       _rowOpacity : new Animated.Value(0)
   };

   componentDidMount() {
     if (!this.props.index) {
       Animated.timing(this.state._rowOpacity, {
           toValue  : 1,
           duration : this._defaultDuration
       }).start()
     } else {
       delay = this.props.index * this._indexMultiplier
       Animated.timing(this.state._rowOpacity, {
           toValue  : 1,
           duration : this.props.duration,
           delay : delay
       }).start()
     }
   }

   render() {
       return (
           <Animated.View
               style={[this.props.style, {opacity: this.state._rowOpacity}]}>
               {this.props.children}
           </Animated.View>
       );
   }

}
