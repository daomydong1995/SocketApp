import { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas/index'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { updateSignature } from '../../../../reducer/action/index'
import { connect } from 'react-redux'
const io = require('socket.io-client/dist/socket.io')
const RNFS = require('react-native-fs')
type Props = {}
type State = {
  requiredString: string
}

class SignWritingComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      requiredString: ''
    }
    this.clearWriting = this.clearWriting.bind(this)
    this.updateSignatureComponent = this.updateSignatureComponent.bind(this)
    this.socket = io("http://localhost:3000", {
      transports: ['websocket']
    })
  }

  clearWriting () {
  }
  updateSignatureComponent(value) {
    this.props.updateSignature(value)
    this.setState({
      requiredString: ''
    })
  }
  renderViewClear () {
    return (
        <Icon style={{right: 130, top: 265,position: 'absolute'}} name='sync-alt' size={28}/>
    )
  }

  renderViewSave () {
    const isValid = (this.props.isAccessRules && this.props.existSignature)
    return (
      <View pointerEvents={isValid ? 'auto' : 'none'}
            style={isValid ? styles.functionButtonAccessible : styles.functionButtonUnAccessible}><Text
        style={{fontSize: 18, color: '#151515'}}>Xác nhận</Text></View>
    )
  }

  render () {
    var today = new Date()
    return (
      <View style={styles.container}>
        <Text style={{
          fontSize: 18,
        }}>Ngày {today.getDate()} tháng {today.getMonth()} năm {today.getFullYear()} </Text>
        <RNSketchCanvas
          containerStyle={{backgroundColor: 'transparent',flexDirection: 'column', flex: 1}}
          canvasStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            width: 400,
            height: '100%',
            borderColor: '#000'
          }}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          // closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
          // undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
          // eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
          clearComponent={this.renderViewClear()}
          // strokeComponent={color => (
          //   <View style={[{backgroundColor: color}, styles.strokeColorButton]}/>
          // )}
          // strokeSelectedComponent={(color, index, changed) => {
          //   return (
          //     <View style={[{backgroundColor: color, borderWidth: 2}, styles.strokeColorButton]}/>
          //   )
          // }}
          // strokeWidthComponent={(w) => {
          //   return (<View style={styles.strokeWidthButton}>
          //       <View style={{
          //         backgroundColor: 'white',
          //         marginHorizontal: 2.5,
          //         width: Math.sqrt(w / 3) * 10,
          //         height: Math.sqrt(w / 3) * 10,
          //         borderRadius: Math.sqrt(w / 3) * 10 / 2
          //       }}/>
          //     </View>
          //   )
          // }}
          saveComponent={this.renderViewSave()}
          onClearPressed={() => this.updateSignatureComponent(false)}
          onStrokeEnd={() => this.updateSignatureComponent(true)}
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
                var base64Icon = 'data:image/png;base64,' + data
                this.socket.emit('image', {image: true, buffer: base64Icon})
                this.setState({requiredString: base64Icon},() => this.socket.emit('image',base64Icon))
              }).then(() => {
                RNFS.exists(path).then((result) => {
                  if(result) {
                    return RNFS.unlink(path)
                  }
                })
              })
            }
          }}
        />
        <Text style={{color: '#727272',marginTop: 5 ,fontSize: 14}}>(Khách hàng ký)</Text>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  ...state.userInfoReducer
})
export default connect(
  mapStateToProps, {
    updateSignature
  }
)(SignWritingComponent)
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
    width: 400,
    padding: 10,
    flex: 1
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: '#39579A'
  },
  functionButtonAccessible: {
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#51e066', justifyContent: 'center', alignItems: 'center', borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',right: 0, top: 250,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    position: 'absolute'
  },
  functionButtonUnAccessible: {
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#e01d2d', justifyContent: 'center', alignItems: 'center', borderRadius: 3,
    borderWidth: 2,
    borderColor: 'black',right: 0, top: 250,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 1.0,
    position: 'absolute'
  }
})
