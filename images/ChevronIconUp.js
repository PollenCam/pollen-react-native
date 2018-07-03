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
            d="M11.38,104.84,150,40.2l138.62,64.64A8,8,0,0,0,300,97.59V73.31a8,8,0,0,0-4.62-7.25L156.1,1.12A11.89,11.89,0,0,0,150,.05a11.89,11.89,0,0,0-6.1,1.07L4.62,66.06A8,8,0,0,0,0,73.31V97.59A8,8,0,0,0,11.38,104.84Z"
            fill="black"
            />
        </Svg>
      </View>
    )
  }
}
