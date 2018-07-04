import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill, Circle } = Svg;

export default class GalleryListIcon extends React.Component {
  render() {
    const opacity = (this.props.invisible ? 0 : 100);

    return (
      <View style={[{opacity: opacity}]}>
        <Svg
          height="24"
          width="24"
          viewBox="0 0 224 288"
        >
          <Path
            d="M0,50.39V274.61C0,282,7.16,288,16,288H208c8.84,0,16-6,16-13.39V50.39C224,43,216.84,37,208,37H16C7.16,37,0,43,0,50.39Z"
            fill="black"
          />
          <Circle
            cx="24.5"
            cy="12.5"
            r="12.5"
            fill="black"
          />
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
