import { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import RNSketchCanvas from 'react-native-sketch-canvas'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { updateSignatureExits } from '../../../../reducer/action/index'
import { connect } from 'react-redux'
import { updateSignature, updateVisibleSignWriting } from '../../../../reducer/action'
const RNFS = require('react-native-fs')
type Props = {}
type State = {
}

class SignWritingComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
      exitsSign: false
    }
  }
  componentDidMount () {
    this.props.socket.on('open_sign_writing', (data) => {
      this.props.updateVisibleSignWriting(data)
    })
  }
  clearWriting () {
    this.setState({
      exitsSign: false
    })
  }

  onStrokeEnd () {
    this.setState({
      exitsSign: true
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
    return (
      <View
        style={styles.saveButtonStyle}>
        <Text style={{fontSize: 18, color: '#ffffff'}}>Xác nhận</Text>
      </View>
    )
  }

  render () {
    const today = new Date()
    return (
      <View>
        <Modal
          animationType="fade"
          presentationStyle={'formSheet'}
          onRequestClose={()=>{}}
          transparent={false}
          visible={this.props.visibleSignWriting}>
          <View style={{alignItems: 'flex-end',backgroundColor: '#f3f3f3', flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.updateVisibleSignWriting(false)}
                              style={{margin: 5,height: 60, width: 60, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name='times' size={30} color={'#c32333'}/>
            </TouchableOpacity>
            <View style={styles.container}>
              <Text style={{
                fontSize: 18
              }}>Ngày {today.getDate()} tháng {today.getMonth()} năm {today.getFullYear()} </Text>
              <RNSketchCanvas
                containerStyle={{
                  width: 400,
                  height: 500,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                canvasStyle={{
                  backgroundColor: '#fff',
                  marginBottom:40,
                  width: '100%',
                  height: '60%',
                  borderWidth: 1
                }}
                defaultStrokeIndex={0}
                defaultStrokeWidth={5}
                clearComponent={this.renderViewClear()}
                saveComponent={this.renderViewSave()}
                onClearPressed={this.clearWriting.bind(this)}
                onStrokeEnd={this.onStrokeEnd.bind(this)}
                savePreference={() => {
                  return {
                    filename: String(Math.ceil(Math.random() * 100000000)),
                    imageType: 'png',
                    transparent: true,
                    folder: 'tempSignature'
                  }
                }}
                onSketchSaved={(success, path) =>  {
                  if (success) {
                      RNFS.readFile(path, 'base64').then(data => {
                      const base64Image = 'data:image/png;base64,' + data
                      this.props.updateSignature(base64Image)
                    }).then(() => {
                      RNFS.exists(path).then((result) => {
                        if (result) {
                          this.props.updateVisibleSignWriting(false)
                          this.props.updateSignatureExits(this.state.exitsSign)
                          return RNFS.unlink(path)
                        }
                      })
                    })
                  }
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer,
  visibleSignWriting: state.settingReducer.visibleSignWriting,
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
    updateSignatureExits,
    updateSignature,
    updateVisibleSignWriting
  }
)(SignWritingComponent)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonStyle: {
    width: 100,
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#3dae61', justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    borderColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3
  }
})
