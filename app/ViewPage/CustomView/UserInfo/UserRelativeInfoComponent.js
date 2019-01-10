import { Component } from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-datepicker'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserRelativeInfoComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <View style={styles.container} pointerEvents={'none'}>
        <Text style={styles.textTileStyle}>
          Thông tin người thân
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '20%', alignItems:'center'}}>
            <Image
              source={this.props.rltInfo.imageRltAvatarBase64 === '' ? require('../../../../assets/images/userplaceholder.png') : {uri: this.props.rltInfo.imageRltAvatarBase64}}
              style={{width: 160, height: 200}}/>
          </View>
          <View style={{flexDirection: 'column', width: '80%', alignItems: 'center'}}>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Họ tên:</Text>
                <Text
                  style={styles.textStyle}>{this.props.rltInfo.rltName}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Quan hệ</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltInfo}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Email</Text>
                <Text
                  style={styles.textStyle}>{this.props.rltInfo.rltEmail}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Số điện thoại:</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltPhone}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>CMND:</Text>
                <Text style={styles.textStyle}>
                  {this.props.rltInfo.rltCMT}
                </Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltCMTDay}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.rltInfo.rltCMTPlace}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Hộ chiếu</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltPassport}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
                <Text
                  style={styles.textStyle}>{this.props.rltInfo.rltPassportDate}</Text>
              </View>
              <View style={styles.itemRowContainer}>
                <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltPassportPlace}</Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={[styles.itemRowContainer, {width: '100%'}]}>
                <Text style={styles.textLabelStyle}>Địa chỉ:</Text>
                <Text style={styles.textStyle}>{this.props.rltInfo.rltAddress}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  rltInfo: state.userRelativeInfoReducer
})
export default connect(
  mapStateToProps, {}
)(UserRelativeInfoComponent)

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
});
