import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,Text
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import connect from 'react-redux/es/connect/connect'
import { updateAvatarBase64, updateAvatarRltBase64 } from '../reducer/action'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import QRCodeScanner from 'react-native-qrcode-scanner'
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
    if (undefined !== barcodes && barcodes.type === 'org.iso.QRCode') {
      this.props.navigation.getParam('callback')(barcodes.data.replace('http://',''))
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
        <QRCodeScanner
          onRead={(data) => this.scanQRcode(data)}/>
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
    width: '100%',
    justifyContent: 'flex-end'
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
