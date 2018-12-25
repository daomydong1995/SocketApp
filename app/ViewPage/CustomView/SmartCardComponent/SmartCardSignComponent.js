import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SmartCardLogoComponent from './SmartCardLogoComponent'
import rules from '../../../../assets/json/rules'
import { CheckBox } from 'react-native-elements'
import SignWritingComponent from './HandleSignWritingComponent/SignWritingComponent'
import { updateAccessRules } from '../../../reducer/action/index'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SCREENS from '../../../ContanstPage/SCREENS'
import userRelativeInfoReducer from '../../../reducer/userRelativeInfoReducer'

type Props = {
  navigate: any
}
type State = {
  enabled: true
}

class SmartCardSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
    this.navigateScreenCamera = this.navigateScreenCamera.bind(this)
  }
  navigateScreenCamera (forUser) {
    this.props.navigate(SCREENS.TAKE_PHOTO_PAGE, {forUser:forUser})
    // console.log(forUser)
  }
  change (name) {
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
              <Image
                source={this.props.userInfo.imageAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.userInfo.imageAvatarBase64}}
                style={{width: 160, height: 239 * 0.8, borderWidth: 1}}/>
              <TouchableOpacity style={{width: 180, alignItems: 'center', marginTop: 10}} onPress={() => this.navigateScreenCamera(true)}>
                <Text style={{textAlign: 'center', padding: 4, fontSize: 18, borderRadius: 2, borderWidth: 3}}>Chụp
                  ảnh <Icon name={'camera'} size={18}/></Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.textTileStyle}>Ảnh người thân</Text>
              </View>
              <Image
                source={this.props.rltInfo.imageRltAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.rltInfo.imageRltAvatarBase64}}
                style={{width: 160, height: 239 * 0.8, borderWidth: 1}}/>
              <TouchableOpacity style={{width: 180, alignItems: 'center', marginTop: 10}} onPress={() => this.navigateScreenCamera(false)}>
                <Text style={{textAlign: 'center', padding: 4, fontSize: 18, borderRadius: 2, borderWidth: 3}}>Chụp
                  ảnh <Icon name={'camera'} size={18}/></Text>
              </TouchableOpacity>
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
  }
})
const mapStateToProps = state => ({
  userInfo: state.userInfoReducer,
  rltInfo: state.userRelativeInfoReducer
})
export default connect(
  mapStateToProps, {
    updateAccessRules
  }
)(SmartCardSignComponent)
