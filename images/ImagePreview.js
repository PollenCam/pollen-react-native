import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Svg } from 'expo'
const { Path, Fill, Rectangle } = Svg;

export default class ImagePreview extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg
          height="32"
          width="32"
          viewBox="0 0 499 499"
        >
          <Rectangle
            width="499"
            height="499"
          />
          <Path
            d="M329,246.61h0a3.34,3.34,0,0,0,0,5.73h0a3.33,3.33,0,0,1-.45,6h0a3.34,3.34,0,0,0-.87,5.67h0a3.34,3.34,0,0,1-1.36,5.82h0a3.34,3.34,0,0,0-1.71,5.47h0a3.35,3.35,0,0,1-2.22,5.56h0a3.35,3.35,0,0,0-2.53,5.16h0a3.36,3.36,0,0,1-3,5.17h0a3.38,3.38,0,0,0-3.28,4.74h0a3.38,3.38,0,0,1-3.79,4.67h0a3.39,3.39,0,0,0-4,4.2h0a3.39,3.39,0,0,1-4.45,4.06h0a3.4,3.4,0,0,0-4.55,3.57h0a3.41,3.41,0,0,1-5,3.37h0a3.41,3.41,0,0,0-5,2.86h0a3.42,3.42,0,0,1-5.47,2.59h0a3.44,3.44,0,0,0-5.42,2.1h0a3.43,3.43,0,0,1-5.8,1.76h0a3.44,3.44,0,0,0-5.68,1.28h0a3.44,3.44,0,0,1-6,.89h0a3.45,3.45,0,0,0-5.81.43h0a3.44,3.44,0,0,1-6.07,0h0a3.44,3.44,0,0,0-5.8-.43h0a3.44,3.44,0,0,1-6-.89h0a3.44,3.44,0,0,0-5.67-1.27h0a3.43,3.43,0,0,1-5.8-1.76h0a3.43,3.43,0,0,0-5.42-2.09h0a3.42,3.42,0,0,1-5.47-2.59h0a3.42,3.42,0,0,0-5-2.86h0a3.41,3.41,0,0,1-5-3.36h0a3.4,3.4,0,0,0-4.55-3.57h0a3.39,3.39,0,0,1-4.45-4.06h0a3.38,3.38,0,0,0-4-4.2h0a3.37,3.37,0,0,1-3.78-4.66h0a3.36,3.36,0,0,0-3.28-4.73h0a3.36,3.36,0,0,1-3-5.18h0a3.34,3.34,0,0,0-2.53-5.15h0a3.35,3.35,0,0,1-2.21-5.56h0a3.34,3.34,0,0,0-1.72-5.47h0a3.35,3.35,0,0,1-1.35-5.83h0a3.33,3.33,0,0,0-.86-5.66h0a3.33,3.33,0,0,1-.45-5.95h0a3.34,3.34,0,0,0,0-5.73h0a3.33,3.33,0,0,1,.45-5.95h0a3.34,3.34,0,0,0,.87-5.67h0a3.34,3.34,0,0,1,1.36-5.82h0a3.34,3.34,0,0,0,1.71-5.47h0a3.35,3.35,0,0,1,2.22-5.56h0a3.35,3.35,0,0,0,2.53-5.16h0a3.36,3.36,0,0,1,3-5.17h0a3.38,3.38,0,0,0,3.28-4.74h0a3.38,3.38,0,0,1,3.79-4.67h0a3.39,3.39,0,0,0,4-4.2h0a3.39,3.39,0,0,1,4.45-4.06h0a3.4,3.4,0,0,0,4.55-3.57h0a3.41,3.41,0,0,1,5-3.37h0a3.41,3.41,0,0,0,5-2.86h0a3.42,3.42,0,0,1,5.47-2.59h0a3.44,3.44,0,0,0,5.42-2.1h0a3.43,3.43,0,0,1,5.8-1.76h0a3.44,3.44,0,0,0,5.68-1.28h0a3.44,3.44,0,0,1,6-.89h0a3.45,3.45,0,0,0,5.81-.43h0a3.44,3.44,0,0,1,6.07,0h0a3.44,3.44,0,0,0,5.8.43h0a3.44,3.44,0,0,1,6,.89h0a3.44,3.44,0,0,0,5.67,1.27h0a3.43,3.43,0,0,1,5.8,1.76h0a3.43,3.43,0,0,0,5.42,2.09h0a3.42,3.42,0,0,1,5.47,2.59h0a3.42,3.42,0,0,0,5,2.86h0a3.41,3.41,0,0,1,5,3.36h0a3.4,3.4,0,0,0,4.55,3.57h0a3.39,3.39,0,0,1,4.45,4.06h0a3.38,3.38,0,0,0,4,4.2h0a3.37,3.37,0,0,1,3.78,4.66h0a3.36,3.36,0,0,0,3.28,4.73h0a3.36,3.36,0,0,1,3,5.18h0a3.34,3.34,0,0,0,2.53,5.15h0a3.35,3.35,0,0,1,2.21,5.56h0a3.34,3.34,0,0,0,1.72,5.47h0a3.35,3.35,0,0,1,1.35,5.83h0a3.33,3.33,0,0,0,.86,5.66h0A3.33,3.33,0,0,1,329,246.61Z"
            fill="white"
          />
          <Path
            d="M243.48,194.74l-.87,7.15q10.33-8.82,21.75-8.82A30,30,0,0,1,287,202.54q9,9.47,9,23.92,0,16-10.33,27a33.61,33.61,0,0,1-25.51,10.91q-7.8,0-12.79-2.46-5.2-2.44-11.06-8.89l-6,48.71h-16l13.15-107ZM280,227.11q0-9-5.2-14.81a17,17,0,0,0-13.3-5.86,21.1,21.1,0,0,0-16.19,7.08,24.84,24.84,0,0,0-6.5,17.42q0,9,5.49,14.53a18.94,18.94,0,0,0,14.17,5.63,19.76,19.76,0,0,0,15.32-6.94A25,25,0,0,0,280,227.11Z"
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
