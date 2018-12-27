import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import connect from 'react-redux/es/connect/connect'
import { updateAvatarBase64, updateAvatarRltBase64 } from '../reducer/action'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SCREENSTITLE from '../ContanstPage/SCREENSTITLE'
import HeaderCustom from './CustomView/Header/HeaderCustom'

type Props = {}
type State = {
  fontCamera: boolean,
  flashOn: boolean
}

class TakePhotoPage extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      fontCamera: true,
      flashOn: true
    }
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
  }

  eventLeftHeader () {
    this.props.navigation.goBack()
  }

  render () {
    const forUser = this.props.navigation.state.params.forUser
    return (
      <View style={styles.container}>
        <HeaderCustom title={forUser ? 'Chụp ảnh cá nhân' : 'Chụp ảnh người thân'}
                      leftView={(<Icon name='angle-left' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}
        />

        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={this.state.fontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          flashMode={this.state.flashOn?RNCamera.Constants.FlashMode.on:RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes)
          }}>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between', width: '100%', padding: 10}}>
            <TouchableOpacity
              onPress={() => this.setState({fontCamera: !this.state.fontCamera})}
              style={{padding: 20}}>
              <Icon name={'redo-alt'} size={33} color={'#ff65f0'}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={styles.capture}>
              <Icon name={'camera'} size={33} color={'#ff65f0'}/>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.state.baseImage===''}
              onPress={this.flashMode.bind(this)}
              style={{padding: 20}}>
              <Icon name={'bolt'} color={this.state.flashOn?'#fff':'transparent'} size={33}/>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    )

  }

  flashMode = async function () {
    this.setState({flashOn: !this.state.flashOn})
  }
  takePicture = async function () {
    if (this.camera) {
      const options = {quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true}
      const data = await this.camera.takePictureAsync(options)
      const base64Image = 'data:image/png;base64,' + data.base64
      if (this.props.navigation.state.params.forUser) {
        this.props.updateAvatarBase64(base64Image)
        this.props.socket.emit('web_wallet_on', {type: 'USER_AVATAR', buffer: base64Image})
      } else {
        this.props.updateAvatarRltBase64(base64Image)
        this.props.socket.emit('web_wallet_on', {type: 'RELATIVE_USER_AVATAR', buffer: base64Image})
      }
      this.props.navigation.goBack()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
})
const mapStateToProps = state => ({
  ...state.userInfoReducer,
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
    updateAvatarBase64,
    updateAvatarRltBase64
  }
)(TakePhotoPage)
