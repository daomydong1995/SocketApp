import React, { Component } from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas/index'

const io = require('socket.io-client/dist/socket.io')
const RNFS = require('react-native-fs')
import { connect } from 'react-redux'
import HeaderCustom from './CustomView/Header/HeaderCustom'
import Icon from 'react-native-vector-icons/FontAwesome5'
type Props = {
}
type State = {
  imageSign: Object
}

export class SignSubmitPage extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.sendImage = this.sendImage.bind(this)
    this.eventRightHeader = this.eventRightHeader.bind(this)
    this.socket = io('http://localhost:3000', {
      transports: ['websocket']
    })
  }

  sendImage () {
    const file = RNSketchCanvas.getPaths()
    this.socket.emit('image', {image: true, buffer: file})
  }

  renderRightHeader(){
    return(
      <Icon name='pencil' color='#fff' size={18}/>
    )
  }
  eventRightHeader(){
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <HeaderCustom title={'Home'} leftView={this.renderRightHeader()} handleLeftButton={this.eventRightHeader}/>
        <View style={styles.container}>
          <View style={{width: '100%', height: '50%', flexDirection: 'row'}}>
            <RNSketchCanvas
              containerStyle={{backgroundColor: 'transparent', flex: 1}}
              canvasStyle={{backgroundColor: 'transparent', flex: 1}}
              defaultStrokeIndex={0}
              defaultStrokeWidth={5}
              closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
              undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
              clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
              eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
              strokeComponent={color => (
                <View style={[{backgroundColor: color}, styles.strokeColorButton]}/>
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <View style={[{backgroundColor: color, borderWidth: 2}, styles.strokeColorButton]}/>
                )
              }}
              strokeWidthComponent={(w) => {
                return (<View style={styles.strokeWidthButton}>
                    <View style={{
                      backgroundColor: 'white',
                      marginHorizontal: 2.5,
                      width: Math.sqrt(w / 3) * 10,
                      height: Math.sqrt(w / 3) * 10,
                      borderRadius: Math.sqrt(w / 3) * 10 / 2
                    }}/>
                  </View>
                )
              }}
              saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
              savePreference={() => {
                return {
                  folder: 'RNSketchCanvas',
                  filename: String(Math.ceil(Math.random() * 100000000)),
                  transparent: true,
                  imageType: 'png'
                }
              }}
              onSketchSaved={(success, path) => {
                if (success) {
                  RNFS.readFile(path, 'base64').then(data => {
                    this.socket.emit('image', {image: true, buffer: data})
                  })
                }
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
})
const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch, state) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignSubmitPage)
