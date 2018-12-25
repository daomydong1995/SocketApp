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
  baseImage: String
}

class TakePhotoPage extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      fontCamera: true,
      baseImage:''
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
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes)
          }}
        >
          <View style={{alignSelf: 'flex-end',margin: 10}}>
            <Image source={{width: 60,height: 90,uri: this.state.baseImage}}/>
          </View>
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
              onPress={this.savePicture.bind(this)}
              style={{padding: 20}}>
              <Icon name={'check'} size={33} color={this.state.baseImage===''?'#acacac':'#ff65f0'}/>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    )

  }

  savePicture = async function () {
    if (this.props.navigation.state.params.forUser) {
      this.props.updateAvatarBase64(this.state.baseImage)
    } else {
      this.props.updateAvatarRltBase64(this.state.baseImage)
    }
    this.props.navigation.goBack()
  }
  takePicture = async function () {
    if (this.camera) {
      const options = {quality: 0.5, base64: true, forceUpOrientation: true, fixOrientation: true}
      const data = await this.camera.takePictureAsync(options)
      const base64Image = 'data:image/png;base64,' + data.base64
      this.setState({baseImage: base64Image})
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
  ...state.userInfoReducer
})
export default connect(
  mapStateToProps, {
    updateAvatarBase64,
    updateAvatarRltBase64
  }
)(TakePhotoPage)
