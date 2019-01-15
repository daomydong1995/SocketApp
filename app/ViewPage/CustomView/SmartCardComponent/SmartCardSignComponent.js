import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SmartCardLogoComponent from './SmartCardLogoComponent'
import rules from '../../../../assets/json/rules'
import { CheckBox } from 'react-native-elements'
import SignWritingComponent from './HandleSignWritingComponent/SignWritingComponent'
import {
  updateAccessRules,
  updateAvatarBase64,
  updateAvatarRltBase64,
  updateControl
} from '../../../reducer/action/index'
import { connect } from 'react-redux'
import CameraStream from '../../StreamCamera/CameraStream'
import ViewShot from 'react-native-view-shot'

const RNFS = require('react-native-fs')
type Props = {
  navigate: any
}
type State = {
  enabled: true,
  controlCamera: 'none'
}

class SmartCardSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    let self = this
    this.props.socket.on('takePicture', function (msg) {
      let viewShot
      if (msg === 'USER_AVATAR') {
        viewShot = self.refs.userAvatar
      } else if (msg === 'RELATIVE_USER_AVATAR') {
        viewShot = self.refs.rltUserAvatar
      } else {
        return
      }
      viewShot.capture().then(uri => {
        RNFS.readFile(uri, 'base64').then(data => {
          const base64Image = 'data:image/png;base64,' + data
          if (msg === 'USER_AVATAR') {
            self.props.updateAvatarBase64(base64Image)
          } else if (msg === 'RELATIVE_USER_AVATAR') {
            self.props.updateAvatarRltBase64(base64Image)
          }
          self.props.socket.emit('web_wallet_on', {type: msg, buffer: base64Image})
        }).then(() => {
          RNFS.exists(uri).then((result) => {
            if (result) {
              console.log('takePicture',uri)
              self.props.updateControl('none')
              return RNFS.unlink(uri)
            }
          })
        })
      })
    }, error => console.error("Oops, snapshot failed", error))
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cartAndCashStyle}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%'}}>
              <View>
                <Text style={styles.textTileStyle}>Ảnh cá nhân</Text>
                <View style={styles.stylePhoto}>
                  <ViewShot ref="userAvatar" options={{format: 'jpg', quality: 0.9}}>
                    {
                      this.props.control !== 'USER_AVATAR' &&
                      <Image
                        source={this.props.userInfo.imageAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.userInfo.imageAvatarBase64}}
                        style={{width: '100%', height: '100%'}}/>
                    }
                    {
                      this.props.control === 'USER_AVATAR' && <CameraStream/>
                    }
                  </ViewShot>
                </View>
              </View>
              <View>
                  <Text style={styles.textTileStyle}>Ảnh người thân</Text>
                <View style={styles.stylePhoto}>
                  <ViewShot ref="rltUserAvatar" options={{format: 'jpg', quality: 1.0}}>
                    {
                      this.props.control !== 'RELATIVE_USER_AVATAR'
                      && <Image
                        source={this.props.rltInfo.imageRltAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.rltInfo.imageRltAvatarBase64}}
                        style={{width: '100%', height: '100%'}}/>
                    }
                    {
                      this.props.control === 'RELATIVE_USER_AVATAR' && <CameraStream/>
                    }
                  </ViewShot>
                </View>
              </View>
              <SmartCardLogoComponent userCode={'0000-0000-0000-0000'} userName={'đào mỹ đông'}/>
            </View>
          </View>
        <View style={styles.roleContainer}>
          <Text style={[styles.textTileStyle]}>Điều khoản dịch vụ</Text>
          <ScrollView style={styles.rulesScrollStyle}
                      contentContainerStyle={{paddingBottom: 30}}
                      bounces={false}
                      bouncesZoom={false}>
            <TextInput
              multiline={true}
              placeholder='Enter description...'
              editable={false}
              selectTextOnFocus={false}
              style={styles.textInputStyle}>
              {rules.rule}
            </TextInput>
          </ScrollView>
          <CheckBox
            title='Tôi chấp thuận điều khoản này.'
            checked={this.props.userInfo.isAccessRules}
            checkedIcon='check-square-o'
            uncheckedIcon='check-square-o'
            checkedColor={'#4ac3ff'}
            onPress={() => this.props.updateAccessRules(!this.props.userInfo.isAccessRules)}
            containerStyle={styles.checkBoxStyle}
            textStyle={{fontSize: 18}}
          />
          <View style={styles.signWritingStyle}>
            <SignWritingComponent/>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  cartAndCashStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  textTileStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },
  textInputStyle: {
    fontSize: 18
  },
  checkBoxStyle: {
    width: '95%',
    margin: 5,
    backgroundColor: 'transparent'
  },
  rulesScrollStyle: {
    width: '95%',
    height: 200,
    borderWidth: 2,
    borderColor: '#9c9c9c',
    borderRadius: 2,
    padding: 5,
    flex: 1
  },
  roleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signWritingStyle: {
    alignItems: 'flex-end',
    width: '95%',
    justifyContent: 'center'
  },
  stylePhoto: {width: 160, height: 239 * 0.8, borderWidth: 1}
})
const mapStateToProps = state => ({
  userInfo: state.userInfoReducer,
  rltInfo: state.userRelativeInfoReducer,
  control: state.settingReducer.control,
  socket: state.settingReducer.socket
})
export default connect(
  mapStateToProps, {
    updateAccessRules,
    updateControl,
    updateAvatarBase64,
    updateAvatarRltBase64
  }
)(SmartCardSignComponent)
