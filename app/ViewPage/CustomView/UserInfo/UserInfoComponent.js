import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserInfoComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      genderList: [
        {
          label: 'Nữ',
          value: false
        },
        {
          label: 'Nam',
          value: true
        }
      ]
    }
  }

  render () {
    return (
      <View style={styles.container} pointerEvents={'none'}>
        <Text style={styles.textTileStyle}>
          Thông tin bệnh nhân
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '20%', alignItems:'center'}}>
            <Image
              source={this.props.userInfo.imageAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.userInfo.imageAvatarBase64}}
              style={{width: 160, height: 200}}/>
          </View>
          <View style={{flexDirection: 'column', width: '80%', alignItems: 'center'}}>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Mã bệnh nhân:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userDistrict}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Mã ví:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userWards}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Mã thẻ:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userDistrict}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Bệnh viện:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userWards}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Họ tên:</Text>
                <Text style={styles.textStyle}>
                  {this.props.userInfo.userName}
                </Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Ngày sinh:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userBirth}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Tuổi:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userOld}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Giới tính:</Text>
                <Text style={styles.textStyle}>{this.props.userGender ? 'Nam' : 'Nữ'}</Text>
              </View>
              <View style={[styles.itemRowContainer]}>
                <Text style={styles.textLabelStyle}>Nghề nghiệp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userJob}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Email:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userEmail}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Số điện thoại:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userPhone}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Số CMT/CC:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userCMT}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userCMTDay}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userCMTPlace}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Hộ chiếu:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userPassport}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userPassportDate}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userPassportPlace}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Quốc tịch:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userCountry}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Dân tộc:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userNation}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Thẻ BHYT:</Text>
                <Text
                  style={styles.textStyle}>{this.props.userInfo.userTBH}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={[styles.itemRowContainer, {width: '100%'}]}>
                <Text style={styles.textLabelStyle}>Địa chỉ:</Text>
                <Text style={styles.textStyle}>{this.props.userInfo.userAddress}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfoReducer
})
export default connect(
  mapStateToProps, {}
)(UserInfoComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    padding: 15
  },
  rowContainer: {
    width: '90%',
    height: 50,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '33%',
    height: '100%',
  },
  textTileStyle: {
    fontSize: 28,
    marginTop: 15,
    marginLeft: 0,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  textLabelStyle: {
    fontSize: 16,
    marginLeft: 10,
    width: 100,
    height: '100%'
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
    width: '60%',
    height: '100%'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
    height: 50,
    color: 'black',
    paddingLeft: 10
  }
})
