import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import connect from 'react-redux/es/connect/connect'
import { updateAvatarBase64, updateAvatarRltBase64 } from '../reducer/action'
import Icon from 'react-native-vector-icons/FontAwesome5'
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
      fontCamera: false,
      flashOn: true
    }
    this.scanQRcode = this.scanQRcode.bind(this)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
  }

  eventLeftHeader () {
    this.props.navigation.goBack()
  }

  componentDidMount () {
    // BackgroundTask.schedule()
  }

  scanQRcode(barcodes) {
    console.log(barcodes)
    if (undefined !== barcodes[0] && barcodes[0].type === 'QR_CODE') {
      this.props.navigation.getParam('callback')(barcodes[0].data.replace('http://',''))
      this.props.navigation.goBack()
    }
  }

  render () {
    // const forUser = this.props.navigation.state.params.forUser
    return (
      <View style={styles.container}>
        <HeaderCustom title={'Scan Ip Address'}
                      leftView={(<Icon name='angle-left' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}
        />
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={this.state.fontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
          flashMode={this.state.flashOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            this.scanQRcode(barcodes)
          }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10
          }}>
            <TouchableOpacity
              onPress={() => this.setState({fontCamera: !this.state.fontCamera})}
              style={{padding: 20}}>
              <Icon name={'redo-alt'} size={33} color={'#ff65f0'}/>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
  }
)(TakePhotoPage)
