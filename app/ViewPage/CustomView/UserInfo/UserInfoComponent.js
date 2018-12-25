import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserInfoComponent extends Component<Props, State> {
  constructor (props) {
    super(props)
    this.inputRefs = {}
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
      <View style={styles.container} >
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
          <View style={[styles.itemRowContainer, {marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày sinh:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.userBirth}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01/01/1995"
              maxDate="01/01/2050"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy bỏ"
              customStyles={{
                dateIcon: {
                  // position: '',//absolute is left
                  width: 45,
                  height: 40
                },
                dateInput: styles.textStyle
              }}/>
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
            <View style={styles.pickkerSelectView}>
              <RNPickerSelect
                placeholder={{
                  label: 'Chọn giới tính...',
                  value: null,
                }}
                items={this.state.genderList}
                onValueChange={(value) => {
                  this.setState({
                    gender: value,
                  })
                }}
                onUpArrow={() => {
                  // this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                  // this.inputRefs.company.focus();
                }}
                style={{...pickerSelectStyles}}
                value={this.props.userGender}
                ref={(el) => {
                  // this.inputRefs.picker2 = el;
                }}
              />
            </View>
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
          <View style={[styles.itemRowContainer, {marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.userCMTDay}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01/01/1995"
              maxDate="01/01/2050"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy bỏ"
              customStyles={{
                dateIcon: {
                  // position: '',//absolute is left
                  width: 45,
                  height: 40
                },
                dateInput: styles.textStyle
              }}/>
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
          <View style={[styles.itemRowContainer, {marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày cấp:</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.userPassportDate}
              mode="date"
              format="DD/MM/YYYY"
              minDate="01/01/1995"
              maxDate="01/01/2050"
              confirmBtnText="Xác nhận"
              cancelBtnText="Hủy bỏ"
              customStyles={{
                dateIcon: {
                  // position: '',//absolute is left
                  width: 45,
                  height: 40
                },
                dateInput: styles.textStyle
              }}/>
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
          <View style={[styles.itemRowContainer, {marginLeft: 5, marginRight: 5}]}>
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
)(UserInfoComponent)

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
    marginLeft: 0,
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
    marginRight: 10,
    height: 50
  },
  textStyle: {
    fontSize: 16,
    marginRight: 10,
    width: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 10
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
