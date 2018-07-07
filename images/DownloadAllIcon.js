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
          viewBox="0 0 300 299.83"
        >
          <Path
            d="M275,207.83v59a8,8,0,0,1-8,8H33a8,8,0,0,1-8-8v-59a8,8,0,0,0-8-8H8a8,8,0,0,0-8,8v84a8,8,0,0,0,8,8H292a8,8,0,0,0,8-8v-84a8,8,0,0,0-8-8h-9A8,8,0,0,0,275,207.83Z"
            fill="black"
          />
          <Path
            d="M154.08,223.93l46.51-52.45c3.45-3.9.91-10.38-4.08-10.38H180.43a5.9,5.9,0,0,1-5.66-6.13V6.13A5.91,5.91,0,0,0,169.1,0H130.9a5.91,5.91,0,0,0-5.67,6.13V155a5.9,5.9,0,0,1-5.66,6.13H103.49c-5,0-7.53,6.48-4.08,10.38l46.51,52.45A5.35,5.35,0,0,0,154.08,223.93Z"
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
