import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill } = Svg;

export default class ToggleCameraBackIcon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg
          height="32"
          width="32"
          viewBox="0 0 300 275"
        >
          <Path
            d="M279.06,25h-64.3a13.62,13.62,0,0,1-12.35-7.19L197.2,7.19A13.63,13.63,0,0,0,184.85,0H113.6a13.64,13.64,0,0,0-12.35,7.19L96,17.81A13.61,13.61,0,0,1,83.7,25H20.94C9.38,25,0,35.75,0,49V251c0,13.25,9.38,24,20.94,24H279.06c11.56,0,20.94-10.75,20.94-24V49C300,35.75,290.62,25,279.06,25ZM241.77,152.89,214.3,186.64a3,3,0,0,1-4.65,0l-27.47-33.75a3,3,0,0,1,2.33-4.89h12.62a3,3,0,0,0,3-3.18,50.27,50.27,0,0,0-100.36,5.64c1,25.55,23.49,47.71,49.05,48.3a50.1,50.1,0,0,0,30.29-9.28,4,4,0,0,1,5.41.79l10.56,13a4,4,0,0,1-.69,5.72A75,75,0,0,1,75,146.69c1-40.57,34.63-73.31,75.2-73.19a75,75,0,0,1,74.7,71.65,3,3,0,0,0,3,2.85h11.53A3,3,0,0,1,241.77,152.89Z"
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
