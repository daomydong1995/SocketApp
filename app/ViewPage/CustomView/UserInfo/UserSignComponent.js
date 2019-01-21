import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import DateTextBox from '../Common/DateTextBox'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserSignComponent extends Component<Props, State> {
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
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Họ tên:</Text>
            <TextInput
              style={styles.textStyle}
              placeholder={''}
              value={this.props.userName}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Ngày sinh:</Text>
            <DateTextBox
              container={styles.datePickerStyle}
              textDate={this.props.userBirth}/>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Tuổi:</Text>
            <TextInput
              style={styles.textStyle}
              placeholder={''}
              value={this.props.userOld}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Giới tính:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userGender}
              placeholder={''}
            />
          </View>
          <View style={[styles.itemRowContainer]}>
            <Text style={styles.textLabelStyle}>Nghề nghiệp:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userJob}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Email:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userEmail}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Số điện thoại:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userPhone}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Số CMT/CC:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userCMT}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DateTextBox
              container={styles.datePickerStyle}
              textDate={this.props.userCMTDay}/>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userCMTPlace}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Hộ chiếu:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userPassport}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DateTextBox
              container={styles.datePickerStyle}
              textDate={this.props.userPassportDate}/>
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Nơi cấp:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userPassportPlace}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Quốc tịch:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userCountry}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Dân tộc:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userNation}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Thẻ BHYT:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userTBH}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.itemRowContainer, {width: '100%'}]}>
            <Text style={styles.textLabelStyle}>Số nhà/ Thôn/ Xóm:</Text>
            <TextInput
              style={[styles.textStyle]}
              value={this.props.userAddress}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Xã/Phường/Thị Trấn:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userDistrict}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Quận/Huyện:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userWards}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Tỉnh/Thành Phố:</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userProvince}
              placeholder={''}
            />
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ...state.userInfoReducer
})
export default connect(
  mapStateToProps, {}
)(UserSignComponent)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    flex: 1
  },
  rowContainer: {
    width: '100%',
    height: 50,
    margin: 5,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '33%',
    height: 50
  },
  textTileStyle: {
    fontSize: 28,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  textLabelStyle: {
    fontSize: 16,
    marginLeft: 10,
    width: 100,
    fontWeight: 'bold'
  },
  datePickerStyle: {
    width: '60%',
    height: 50
  },
  textStyle: {
    fontSize: 16,
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#4c4c4c',
    borderRadius: 3,
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 15
  },
  pickkerSelectView: {
    marginRight: 10,
    width: '60%',
    height: 50,
    backgroundColor: 'white'
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
