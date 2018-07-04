import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill, Rect } = Svg;

export default class GalleryListIcon extends React.Component {
  render() {
    const opacity = (this.props.invisible ? 0 : 100);

    return (
      <View style={[{opacity: opacity}]}>
        <Svg
          height="24"
          width="24"
          viewBox="0 0 226 301"
        >
          <Rect
            width="108"
            height="145"
            rx="12"
            ry="12"
            fill="black"
          />
          <Rect
            x="117"
            width="109"
            height="69"
            rx="12"
            ry="12"
            fill="black"
          />
          <Rect
            x="117"
            y="78"
            width="109"
            height="145"
            rx="12"
            ry="12"
            fill="black"
          />
          <Rect
            y="155"
            width="108"
            height="145"
            rx="12"
            ry="12"
            fill="black"
          />
          <Rect
            x="117"
            y="233"
            width="109"
            height="68"
            rx="12"
            ry="12"
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
