import {
  Constants,
  Camera,
  FileSystem,
  Permissions,
  Svg,
} from 'expo'
const { Path } = Svg;

import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Vibration, CameraRoll, Icon } from 'react-native'
// import isIPhoneX from 'react-native-is-iphonex'

import ToggleCameraBackIcon from '../images/ToggleCameraBackIcon'
import ToggleCameraFrontIcon from '../images/ToggleCameraFrontIcon'
import CameraCircleIcon from '../images/CameraCircleIcon'
import FlashAutoIcon from '../images/FlashAutoIcon'
import FlashOnIcon from '../images/FlashOnIcon'
import FlashOffIcon from '../images/FlashOffIcon'

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    photos: [],
    permissionsGranted: false
  }

  async componentWillMount () {
    await this.requestPermissions()
  }

  componentDidMount() {
    this.props.pinchOut(this.zoomIn.bind(this));
    this.props.pinchIn(this.zoomOut.bind(this));
  }

  async requestPermissions () {
    const { status: cameraPermissions } = await Permissions.askAsync(Permissions.CAMERA)
    const { status: rollPermissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    this.setState({ permissionsGranted: cameraPermissions == 'granted' })
  }

  toggleFacing () {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    })
  }

  toggleFlash () {
    this.setState({
      flash: flashModeOrder[this.state.flash]
    })
  }

// TODO need to fix attempt to zoomOut beyond max bug
  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });
  }

  async takePicture () {
    if (this.camera) {
      const picture = await this.camera.takePictureAsync({ quality: 1, base64: true, exif: true })

      CameraRoll.saveToCameraRoll(picture.uri)

      // await this.uploadPicture(picture)
    }
  }

  renderNoPermissions() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <Text style={{ color: 'white' }}>
          Camera permissions not granted - cannot open camera preview.
        </Text>
      </View>
    )
  }

  renderCamera() {
    return (
      <Camera
        ref={ref => this.camera = ref}
        style={styles.camera}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.iconButton} onPress={this.toggleFacing.bind(this)}>
            {this.renderToggleCameraIcon()}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.cameraCircleButton]} onPress={this.takePicture.bind(this)}>
            <CameraCircleIcon/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={this.toggleFlash.bind(this)}>
            {this.renderFlashIcon()}
          </TouchableOpacity>
        </View>
      </Camera>
    )
  }

  renderToggleCameraIcon() {
    if (this.state.type === 'front') {
      return (
        <ToggleCameraFrontIcon/>
      )
    } else {
      return (
        <ToggleCameraBackIcon/>
      )
    }
  }

  renderFlashIcon() {
    if (this.state.flash === 'auto') {
      return (
        <FlashAutoIcon/>
      )
    } else if (this.state.flash === 'on') {
      return (
        <FlashOnIcon/>
      )
    } else {
      return (
        <FlashOffIcon/>
      )
    }
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions()
    return <View style={styles.container}>{cameraScreenContent}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  camera: {
    flex: 1,
  },
  controls: {
    flex: 1,
    // paddingBottom: isIPhoneX ? 20 : 0,
    backgroundColor: '#00000040',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  iconButton: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cameraCircleButton: {
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
