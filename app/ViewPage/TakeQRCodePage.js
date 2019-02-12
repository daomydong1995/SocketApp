import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import connect from 'react-redux/es/connect/connect'
import Icon from 'react-native-vector-icons/FontAwesome5'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import QRCodeScanner from 'react-native-qrcode-scanner'
type Props = {}
type State = {
  fontCamera: boolean,
  flashOn: boolean
}
class TakeQRCodePage extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      fontCamera: false,
      flashOn: true
    }
    this.scanQRCode = this.scanQRCode.bind(this)
    this.eventLeftHeader = this.eventLeftHeader.bind(this)
  }

  eventLeftHeader () {
    this.props.navigation.goBack()
  }

  scanQRCode(barCodes) {
    if (barCodes && (barCodes.type === 'org.iso.QRCode' || barCodes.type === 'QR_CODE')) {
      this.props.navigation.getParam('callback')(barCodes.data.replace('http://',''))
      this.props.navigation.goBack()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderCustom title={'Scan Ip Address'}
                      leftView={(<Icon name='angle-left' color='#fff' size={28}/>)}
                      handleLeftButton={this.eventLeftHeader}
        />
        <QRCodeScanner
          onRead={(data) => this.scanQRCode(data)}/>
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
})
export default connect(
  mapStateToProps, {
  }
)(TakeQRCodePage)
