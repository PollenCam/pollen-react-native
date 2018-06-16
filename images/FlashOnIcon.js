import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill } = Svg;

export default class FlashOnIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg
          height="32"
          width="32"
          viewBox="0 0 300 300"
        >
          <Path
            d="M150,0A150,150,0,1,0,300,150,150,150,0,0,0,150,0Zm33.21,146.37q-18.36,27.6-36.75,55.17c-6.8,10.18-13.69,20.28-20.55,30.4-1.74,2.56-5.15.49-4.48-2.72,5.68-20.21,13.18-46.31,18.62-64.95,1.79-6.12,1-6.72-4.39-6.91-3.61-.14-11.51-.39-15.13-.65-3.33-.24-5.41-4.35-4.15-8.07l.08-.23q12.09-38,24.17-76a16.79,16.79,0,0,1,1.46-3.13A4.21,4.21,0,0,1,145.68,67H172c2.55,0,4.68,2.65,4.32,5.69a4.29,4.29,0,0,1-.22,1c-6.65,18.37-13.54,36.61-20.35,54.89-2.41,6.5-2.23,6.77,3.82,7.15,6.74.42,13.49.8,20.22,1.43h.08C183.68,137.52,185.58,142.81,183.21,146.37Z"
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
