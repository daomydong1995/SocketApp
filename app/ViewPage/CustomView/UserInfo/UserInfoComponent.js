import { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'

type Props = {}
type State = {
  gender: undefined,
  genderList: Array<any>
}

class UserInfoComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.inputRefs = {};
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
      <View style={styles.container} pointerEvents={'none'} >
        <Text style={styles.textTileStyle}>
          Thông tin khách
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Họ tên</Text>
            <TextInput
              style={styles.textStyle}
              placeholder={''}
              value={this.props.userName}
            />
          </View>
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày sinh</Text>
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
              }} />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Thẻ BHY</Text>
            <TextInput
              style={styles.textStyle}
              placeholder={''}
              value={this.props.userBHY}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Giới tính</Text>
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
                  });
                }}
                onUpArrow={() => {
                  // this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                  // this.inputRefs.company.focus();
                }}
                style={{ ...pickerSelectStyles}}
                value={this.props.userGender}
                ref={(el) => {
                  // this.inputRefs.picker2 = el;
                }}
              />
            </View>
          </View>
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Nghề nghiệp</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userJob}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>SĐT liên hệ</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userPhone}
              placeholder={''}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Số nhà</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userAddress}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Xã/Phường</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userWards}
              placeholder={''}
            />
          </View>
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Quận/Huyện</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userDistrict}
              placeholder={''}
            />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Tỉnh/Thành Phố</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userProvince}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Dân tộc</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userNation}
              placeholder={''}
            />
          </View>
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Quốc tịch</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userCountry}
              placeholder={''}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Số CMT/CC</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userID}
              placeholder={''}
            />
          </View>
          <View style={[styles.itemRowContainer,{marginLeft: 5, marginRight: 5}]}>
            <Text style={styles.textLabelStyle}>Ngày cấp</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={this.props.userIssuedDay}
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
              }} />
          </View>
          <View style={styles.itemRowContainer}>
            <Text style={styles.textLabelStyle}>Nơi cấp</Text>
            <TextInput
              style={styles.textStyle}
              value={this.props.userIssuedPlace}
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
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 30,
    borderColor: '#8a8a8a',
    borderRadius: 10,
    borderWidth: 3,
    flex: 1
  },
  rowContainer: {
    width: '100%',
    height: 50,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: 50
  },
  textTileStyle: {
    fontSize: 28,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  textLabelStyle: {
    fontSize: 16,
    width: '25%',
    fontWeight:'bold'
  },
  datePickerStyle: {
    width: '60%',
    marginRight: 10,
    height: 50
  },
  textStyle: {
    fontSize:16,
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
});
