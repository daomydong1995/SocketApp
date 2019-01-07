import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SmartCardLogoComponent from './SmartCardLogoComponent'
import rules from '../../../../assets/json/rules'
import { CheckBox } from 'react-native-elements'
import SignWritingComponent from './HandleSignWritingComponent/SignWritingComponent'
import { updateAccessRules, updateAvatarBase64, updateAvatarRltBase64 } from '../../../reducer/action/index'
import { connect } from 'react-redux'
import SCREENS from '../../../ContanstPage/SCREENS'
import CameraStream from '../../TestStreamCamera/CameraStream'
import ViewShot from 'react-native-view-shot'

const RNFS = require('react-native-fs')
type Props = {
  navigate: any
}
type State = {
  enabled: true
}

class SmartCardSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.navigateScreenCamera = this.navigateScreenCamera.bind(this)
  }

  navigateScreenCamera (forUser) {
    this.props.navigate(SCREENS.TAKE_PHOTO_PAGE, {forUser: forUser})
    // console.log(forUser)
  }

  componentDidMount () {
    let self = this
    console.log('dong')
    this.props.socket.on('takePicture', function (msg) {
      let viewShot
      console.log(msg)
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
          RNFS.exists(path).then((result) => {
            if (result) {
              return RNFS.unlink(path)
            }
          })
        })
      })
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cartAndCashStyle}>
          <View style={styles.takeAPhoto}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.textTileStyle}>Ảnh cá nhân</Text>
              </View>
              <View style={styles.stylePhoto}>
                <ViewShot ref="userAvatar" options={{format: 'jpg', quality: 1.0}}>
                  {
                    this.props.control !== 'USER_AVATAR' &&
                    <Image
                      source={this.props.userInfo.imageAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.userInfo.imageAvatarBase64}}
                      style={{width: '100%', height: '100%'}}/>
                  }
                  {
                    this.props.control === 'USER_AVATAR' &&

                    <CameraStream/>
                  }
                </ViewShot>
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.textTileStyle}>Ảnh người thân</Text>
              </View>
              <View style={styles.stylePhoto}>
                <ViewShot ref="rltUserAvatar" options={{format: 'jpg', quality: 1.0}}>
                  {
                    this.props.control !== 'RELATIVE_USER_AVATAR'
                    && <Image
                      source={this.props.rltInfo.imageRltAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.rltInfo.imageRltAvatarBase64}}
                      style={{width: '100%', height: '100%'}}/>
                  }
                  {
                    this.props.control === 'RELATIVE_USER_AVATAR'
                    && <CameraStream/>

                  }
                </ViewShot>
              </View>
            </View>
          </View>
          <View style={styles.smartCartStyle}>
            <SmartCardLogoComponent userCode={'0000-0000-0000-0000'} userName={'đào mỹ đông'}/>
          </View>
        </View>
        <Text style={[styles.textTileStyle, {fontSize: 22}]}>Điều khoản dịch vụ</Text>
        <ScrollView style={styles.rulesScrollStyle} contentContainerStyle={{paddingBottom: 30}}>
          <TextInput
            multiline={true}
            placeholder='Enter description...'
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10
  },
  cartAndCashStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50
  },
  smartCartStyle: {
    width: '50%',
    alignItems: 'center'
  },
  takeAPhoto: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTileStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginRight: 20
  },
  textInputStyle: {
    fontSize: 18
  },
  checkBoxStyle: {
    backgroundColor: 'transparent'
  },
  rulesScrollStyle: {
    width: '100%',
    height: 150,
    borderWidth: 3,
    borderColor: '#9c9c9c',
    borderRadius: 2,
    margin: 10,
    padding: 5,
    flex: 1
  },
  signWritingStyle: {
    alignItems: 'flex-end',
    width: '100%',
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
    updateAvatarBase64,
    updateAvatarRltBase64
  }
)(SmartCardSignComponent)
