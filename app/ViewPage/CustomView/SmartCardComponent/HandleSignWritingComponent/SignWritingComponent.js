import { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RNSketchCanvas from 'react-native-sketch-canvas'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { updateSignatureExits } from '../../../../reducer/action/index'
import { connect } from 'react-redux'
import { updateSignature } from '../../../../reducer/action'

const RNFS = require('react-native-fs')
type Props = {}
type State = {
  touchCanvasEnable: boolean,
  timeOut: boolean
}

class SignWritingComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      touchCanvasEnable: true
    }
  }

  clearWriting () {
    this.props.updateSignatureExits(false)
    this.setState({
      touchCanvasEnable: true
    })
  }

  onStrokeEnd () {
    this.setState({
      timeOut: true
    })
    this.props.updateSignatureExits(true)
    setTimeout(()=> {
      if (this.state.timeOut) {
        this.setState({
          touchCanvasEnable: false
        })
      }
    },3000)
  }

  onStrokeStart () {
    this.setState({
      timeOut: false
    })
  }

  renderViewClear () {
    return (
      <View style={{height: 42, width: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Icon name='sync-alt' size={30}/>
      </View>
    )
  }

  renderViewSave () {
    const isValid = (this.props.isAccessRules && this.props.existSignature)
    return (
      <View
        style={isValid ? styles.functionButtonAccessible : styles.functionButtonUnAccessible}>
        <Text style={{fontSize: 18, color: '#151515'}}>Xác nhận</Text>
      </View>
    )
  }
  render () {
    const today = new Date()
    return (
      <View style={styles.container}>
        <Text style={{
          fontSize: 18,
          marginBottom: 20
        }}>Ngày {today.getDate()} tháng {today.getMonth()} năm {today.getFullYear()} </Text>
        <RNSketchCanvas
          containerStyle={{
            width: 400,
            height: 400,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          canvasStyle={{
            backgroundColor: 'transparent',
            width: '100%',
            height: '70%',
            borderWidth: 1
          }}
          enableSaveBtn={(this.props.isAccessRules && this.props.existSignature) === undefined ? false : (this.props.isAccessRules && this.props.existSignature)}
          touchEnabled={((this.state.touchCanvasEnable) === undefined ? false : (this.state.touchCanvasEnable))}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          clearComponent={this.renderViewClear()}
          saveComponent={this.renderViewSave()}
          onClearPressed={this.clearWriting.bind(this)}
          onStrokeEnd={this.onStrokeEnd.bind(this)}
          onStrokeStart={this.onStrokeStart.bind(this)}
          savePreference={() => {
            return {
              filename: 'signature',
              imageType: 'png',
              transparent: true,
              folder: 'tempSignature'
            }
          }}
          onSketchSaved={(success, path) => {
            if (success) {
              RNFS.readFile(path, 'base64').then(data => {
                const base64Image = 'data:image/png;base64,' + data
                this.props.updateSignature(base64Image)
                this.props.socket.emit('web_wallet_on', {type: 'USER_SIGNATURE', buffer: base64Image})
              }).then(() => {
                RNFS.exists(path).then((result) => {
                  if (result) {
                    return RNFS.unlink(path)
                  }
                })
              })
            }
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ...state.userInfoReducer,
  imageRltAvatarBase64: state.userRelativeInfoReducer.imageRltAvatarBase64,
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
    updateSignatureExits,
    updateSignature
  }
)(SignWritingComponent)
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  functionButtonAccessible: {
    width: 100,
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#51e066', justifyContent: 'center', alignItems: 'center', borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0
  },
  functionButtonUnAccessible: {
    width: 100,
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#e01d2d', justifyContent: 'center', alignItems: 'center', borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0

  }
})
