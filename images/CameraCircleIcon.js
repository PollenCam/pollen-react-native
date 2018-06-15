import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill } = Svg;

export default class CameraCircleIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg
          height="64"
          width="64"
          viewBox="0 0 475 475"
        >
          <Path
            d="M237.5,0C106.33,0,0,106.33,0,237.5S106.33,475,237.5,475,475,368.67,475,237.5,368.67,0,237.5,0Zm0,437.5c-110.46,0-200-89.54-200-200s89.54-200,200-200,200,89.54,200,200S348,437.5,237.5,437.5Z"
            fill="white"
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
