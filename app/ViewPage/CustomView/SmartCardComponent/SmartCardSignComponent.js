import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SmartCardLogoComponent from './SmartCardLogoComponent'
import rules from '../../../../assets/json/rules'
import { CheckBox } from 'react-native-elements'
import SignWritingComponent from './HandleSignWritingComponent/SignWritingComponent'
import { updateAccessRules } from '../../../reducer/action/index'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

type Props = {}
type State = {}

class SmartCardSignComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
  }

  change (name) {
  }

  takePhoto () {

  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.cartAndCashStyle}>
          <View style={styles.takeAPhoto}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                <Text style={styles.textTileStyle}>Ảnh cá nhân</Text>
                <Icon name='camera' size={26}/>
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../../../../assets/images/userplaceholder.png')}
                  style={{width: '35%', height: 239 * 0.8, borderWidth: 2}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: 2, height: '100%', backgroundColor: '#000'}}/>
          <View style={styles.smartCartStyle}>
            <SmartCardLogoComponent userCode={'0000-0000-0000-0000'} userName={'đào mỹ đông'}/>
          </View>
        </View>
        <Text style={[styles.textTileStyle, {fontSize: 22}]}>Điều khoản dịch vụ</Text>
        <ScrollView style={styles.rulesScrollStyle} contentContainerStyle={{paddingBottom: 30}}>
          <TextInput
            multiline={true}
            placeholder='Enter description...'
            underlineColorAndroid={'transparent'}
            editable={false}
            style={styles.textInputStyle}
            onChangeText={(name) => {this.change(name)}}>{rules.rule}
          </TextInput>
        </ScrollView>
        <CheckBox
          title='Tôi chấp thuận điều khoản này.'
          checked={this.props.isAccessRules}
          checkedIcon='check-square-o'
          uncheckedIcon='check-square-o'
          checkedColor={'#4ac3ff'}
          onPress={() => this.props.updateAccessRules(!this.props.isAccessRules)}
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
    padding: 10,
    margin: 30,
    marginLeft: 50,
    marginRight: 50
  },
  cartAndCashStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  smartCartStyle: {
    width: '48%',
    alignItems: 'center',
  },
  takeAPhoto: {
    width: '48%'
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
    padding: 5
  },
  signWritingStyle: {
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'center'
  }
})
const mapStateToProps = state => ({
  ...state.userInfoReducer
})
export default connect(
  mapStateToProps, {
    updateAccessRules
  }
)(SmartCardSignComponent)
