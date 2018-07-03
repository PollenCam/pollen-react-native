import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill } = Svg;

export default class ChevronIconDown extends React.Component {

  render() {
    const opacity = (this.props.invisible ? 0 : 100);

    return (
      <View style={[{opacity: opacity}]}>
        <Svg
          height="20"
          width="20"
          viewBox="0 0 300 105.6"
        >
          <Path
            d="M288.62.76,150,65.4,11.38.76A8,8,0,0,0,0,8V32.28a8,8,0,0,0,4.62,7.25l139.28,65a11.89,11.89,0,0,0,6.1,1.07,11.89,11.89,0,0,0,6.1-1.07L295.38,39.53A8,8,0,0,0,300,32.28V8A8,8,0,0,0,288.62.76Z"
            fill="black"
          />
        </Svg>
      </View>
    )
  }
}
