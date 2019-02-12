import React, { Component } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SmartCardLogoComponent from './SmartCardLogoComponent'
import rules from '../../../../assets/json/rules'
import { CheckBox } from 'react-native-elements'
import {
  updateAccessRules
} from '../../../reducer/action/index'
import { connect } from 'react-redux'
import CameraStream from '../../StreamCamera/CameraStream'
import SignWritingComponent from './HandleSignWritingComponent/SignWritingComponent'
import { updateSignature, updateVisibleSignWriting } from '../../../reducer/action'

type Props = {
  navigate: any
}
type State = {
  enabled: true,
  controlCamera: 'none'
}

const createFormData = (uri) => {
  const data = new FormData();
  data.append("image", {
    name: 'image.png',
    type: 'image/png',
    uri: uri
  });
  return data;
}

class SmartCardSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  submitSignWriting () {
    fetch('http://localhost:3000/api/files', {
      method: "POST",
      body: createFormData(this.props.userInfo.signatureBase64)
    }).then(response => response.json())
      .then( response => {
        if (response.status && response.status === 'success') {
          this.props.socket.emit('web_wallet_on', {type: 'USER_SIGNATURE', buffer: response.data.uri}, () => {
            this.props.updateSignature(response.data.uri)
            Alert.alert(
              'Thông báo',
              `Xác nhận thành công`,
              [
                {text: 'Ok', onPress: () => {}, style: 'cancel'},
              ],
              {cancelable: false}
            )
          })
        } else {
          self.props.socket.emit('web_wallet_on', {type: 'Error', message: response}, () => {
          })
        }
      })
  }

  componentDidMount () {
  }

  render () {
    const today = new Date()
    const isValid = (this.props.userInfo.isAccessRules && this.props.userInfo.existSignature)
    return (
      <View style={styles.container}>
        <View style={styles.cartAndCashStyle}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', width: '90%'}}>
            <View>
              <Text style={styles.textTileStyle}>Ảnh cá nhân</Text>
              <View style={styles.stylePhoto}>
                  {
                    this.props.control !== 'USER_AVATAR' &&
                    <Image
                      source={this.props.userInfo.imageAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.userInfo.imageAvatarBase64}}
                      style={{width: '100%', height: '100%'}}/>
                  }
                  {
                    this.props.control === 'USER_AVATAR' && <CameraStream/>
                  }
              </View>
            </View>
            <View>
              <Text style={styles.textTileStyle}>Ảnh người thân</Text>
              <View style={styles.stylePhoto}>
                  {
                    this.props.control !== 'RELATIVE_USER_AVATAR'
                    && <Image
                      source={this.props.rltInfo.imageRltAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.rltInfo.imageRltAvatarBase64}}
                      style={{width: '100%', height: '100%'}}/>
                  }
                  {
                    this.props.control === 'RELATIVE_USER_AVATAR' && <CameraStream/>
                  }
              </View>
            </View>
            <SmartCardLogoComponent userCode={this.props.userInfo.userCodeCard}
                                    userName={this.props.userInfo.userNameCard}/>
          </View>
        </View>
        <View style={styles.roleContainer}>
          <Text style={[styles.textTileStyle]}>Điều khoản dịch vụ</Text>
          <TouchableOpacity style={styles.rulesScrollStyle}>
            <TextInput
              multiline={true}
              placeholder='Enter description...'
              editable={false}
              selectTextOnFocus={false}
              style={styles.textInputStyle}>
              {rules.rule}
            </TextInput>
          </TouchableOpacity>
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
            <View style={{width: 400, height: '70%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{
                fontSize: 18,
                marginBottom: 10
              }}>Ngày {today.getDate()} tháng {today.getMonth() + 1} năm {today.getFullYear()} </Text>
              <TouchableOpacity style={styles.imageSignWriting}
                                onPress={() => this.props.updateVisibleSignWriting(true)}>
                {
                  this.props.userInfo.signatureBase64 !== '' &&
                  <Image style={{flex: 1}} source={{uri: this.props.userInfo.signatureBase64}}/>
                }
              </TouchableOpacity>
              <SignWritingComponent/>
              <View style={{width: '100%', alignItems: 'flex-end', marginTop: 20}}>
                <TouchableOpacity disabled={!isValid}
                                  style={isValid ? styles.submitButton : styles.submitButtonUnAccepted}
                                  onPress={this.submitSignWriting.bind(this)}>
                  <Text style={{fontSize: 18, color: '#ffffff'}}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 20
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
    borderColor: '#979797',
    borderRadius: 2,
    padding: 10
  },
  roleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signWritingStyle: {
    alignItems: 'flex-end',
    width: '95%',
    height: 600,
    justifyContent: 'center'
  },
  imageSignWriting: {
    width: '100%',
    height: '70%',
    borderWidth: 1
  },
  stylePhoto: {width: 160, height: 239 * 0.8, borderWidth: 1},
  submitButton: {
    width: 100,
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#5687ee', justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    borderColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3
  },
  submitButtonUnAccepted: {
    width: 100,
    marginHorizontal: 2.5, marginVertical: 8, height: 42, padding: 5, paddingLeft: 10, paddingRight: 10,
    backgroundColor: '#ee3d41', justifyContent: 'center', alignItems: 'center', borderRadius: 10,
    borderColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3
  }
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
    updateVisibleSignWriting,
    updateSignature
  }
)(SmartCardSignComponent)
